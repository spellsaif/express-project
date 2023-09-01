import express from 'express';
import userRoute from '@modules/user/user.route';
import authRoute from '@modules/auth/auth.route';

function createServer() {
  const app = express();

  //Middleware

  app.use('/api/auth', authRoute);
  app.use('/api/users', userRoute);

  return app;
}

export default createServer;
