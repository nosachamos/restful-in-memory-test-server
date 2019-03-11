import { Request, Response, NextFunction } from 'express';
import { Controller } from '../controllers/controller';
import * as express from 'express';

export class Routes {
  public contactController: Controller = new Controller();

  public routes(app: express.Application): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET request successful'
      });
    });

    // commands
    app
      .route('/settings/setDelay/:howLong')
      .get(this.contactController.setDelay);
    app
      .route('/settings/requestsShouldFail/:shouldFail')
      .get(this.contactController.requestsShouldFail);

    app
      .route('/:collectionName')
      .get(this.contactController.list)
      .post(this.contactController.add);

    // entity details
    app
      .route('/:collectionName/:entityId')
      // get specific contact
      .get(this.contactController.read)
      .put(this.contactController.update)
      .delete(this.contactController.delete);

    // entity nested resource
    app
      .route('/:collectionName/:entityId/:nestedCollectionName')
      .get(this.contactController.list)
      .post(this.contactController.add);

    // entity nested resource details
    app
      .route('/:collectionName/:entityId/:nestedCollectionName/:nestedEntityId')
      // get specific contact
      .get(this.contactController.read)
      .put(this.contactController.update)
      .delete(this.contactController.delete);

  }
}
