import 'express-async-errors';
import express from 'express';
import router from './Routes';
import handleApplicationErrors from './middlewares/errorHandlingMiddleware';

export default class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.config();
    this.router();
  }

  private config() {
    this.server.use(express.json());
  }

  public router() {
    this.server.use(router);
    this.server.use(handleApplicationErrors);
  }
}
