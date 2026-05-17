import express from 'express';
import routes from './routes.js';
class App{

  constructor(){
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }

}

export default new App().server;

/*module.exports is not exporting the App class,
and it's not exporting the App instance. 
It is only exporting the Express server object 
that was living inside it.*/
