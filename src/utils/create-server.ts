import express from 'express';
import userRoute from '../modules/User/user.route';

function createServer() {
  const app = express();

  //Middleware

  app.use('/api/users', userRoute);

  return app;
}

export default createServer;
