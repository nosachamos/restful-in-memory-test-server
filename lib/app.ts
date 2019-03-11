import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { Routes } from './routes/routes';
import { Controller } from './controllers/controller';

class App {
  public app: express.Application = express();
  public routePrv: Routes = new Routes();

  constructor() {
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // failing requests if we are configured to do that
    this.app.use((req, res, next) => {
      if (Controller.requestsShouldFail && !req.url.startsWith('/settings')) {
        res.status(500).send({ error: 'An error has occurred' });

      } else {
        next();
      }
    });

    // if we have a delay, implement it globally here
    this.app.use((req, res, next) => Controller.requestDelay > 0 ? setTimeout(next, Controller.requestDelay) : next());

    // serving static files
    this.app.use(express.static('public'));
  }
}

export default new App().app;
