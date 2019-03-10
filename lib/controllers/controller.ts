import { Request, Response } from 'express';
import { getDbData } from '../db/db-data';
import { Guid } from 'guid-typescript';

const db = getDbData();

export class Controller {

  static idPropertyName = 'id';
  static requestDelay = 0;
  static requestsShouldFail = false;

  static _findTargetCollection(req: Request) {
    const collectionName = req.params.collectionName;
    const entityId = req.params.entityId;
    const nestedCollectionName = req.params.nestedCollectionName;

    const baseCollection = db[collectionName];

    if (!baseCollection) {
      return null;
    }
    if (entityId && nestedCollectionName) {
      const baseEntity = baseCollection.find(e => String(e[Controller.idPropertyName]) === entityId);

      if (!baseEntity) {
        return null;
      }

      const nestedCollection = baseEntity[nestedCollectionName];
      return nestedCollection;

    } else {
      return baseCollection;
    }
  }

  public setDelay(req: Request, res: Response) {
    Controller.requestDelay = +req.params.howLong;

    res.status(204);
    return;
  }

  public requestsShouldFail(req: Request, res: Response) {
    Controller.requestsShouldFail = req.params.shouldFail.toLowerCase() === 'true' ? true : false;

    res.status(204);
    return;
  }

  public add(req: Request, res: Response) {
    const targetCollection = Controller._findTargetCollection(req);

    if (!targetCollection) {
      res.status(404);
      return;
    }

    const payload = req.body;

    if (!payload[Controller.idPropertyName]) {
      payload[Controller.idPropertyName] = Guid.create().toString();
      targetCollection.push(payload);
      res.json(payload);

    } else {
      res.status(400).send({ message: 'An entity with the given id already exists.' });
    }
  }

  public list(req: Request, res: Response) {
    const targetCollection = Controller._findTargetCollection(req);

    if (!targetCollection) {
      res.status(404);
      return;
    }

    res.json(targetCollection);
  }

  public read(req: Request, res: Response) {
    const targetCollection = Controller._findTargetCollection(req);

    if (!targetCollection) {
      res.status(404);
      return;
    }

    const targetId = req.params.entityId ? req.params.entityId : req.params.nestedEntityId;

    const result = targetCollection.find(e => String(e[Controller.idPropertyName]) === targetId);

    result ? res.json(result) : res.status(404);
  }

  public update(req: Request, res: Response) {
    const targetCollection = Controller._findTargetCollection(req);

    if (!targetCollection) {
      res.status(404);
      return;
    }

    const targetId = req.params.entityId ? req.params.entityId : req.params.nestedEntityId;

    if (targetCollection[targetId]) {
      targetCollection[targetId] = req.body;
      res.json(targetCollection[targetId]);
      return;
    }
  }

  public delete(req: Request, res: Response) {
    const collectionName = req.params.collectionName;
    const entityId = req.params.entityId;
    const nestedCollectionName = req.params.nestedCollectionName;
    const nestedEntityId = req.params.nestedEntityId;

    const baseCollection = db[collectionName];

    if (!baseCollection) {
      res.status(404);
      return;
    }

    if (entityId) {
      if (nestedCollectionName) {
        const nestedCollection = baseCollection[entityId][nestedCollectionName];
        if (!nestedCollection) {
          res.status(404);
          return;
        }

        if (nestedEntityId) {
          // delete entity from nested collection
          delete nestedCollection[nestedEntityId];
          res.status(204);
          return;

        } else {
          const targetEntity = baseCollection[entityId];

          if (!targetEntity) {
            res.status(404);
            return;
          }

          // delete all from nested collection
          delete baseCollection[entityId][nestedCollectionName];
          res.status(204);
          return;
        }
      } else {
        // delete entity from base collection
        delete baseCollection[entityId];
        res.status(204);
        return;
      }
    } else {
      // delete all from base collection
      delete db[collectionName];
      res.status(204);
      return;
    }
  }
}
