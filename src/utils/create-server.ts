import express from 'express';
import userRoute from '@modules/user/user.route';
import authRoute from '@modules/auth/auth.route';
import Redis from 'ioredis';
import deserializeUser from '@middlewares/deserialize-user';

export const redis = new Redis(
  'redis://default:SmPHIjx8EUyPsCB9F6K6LWY02LYrKaVT@redis-13108.c301.ap-south-1-1.ec2.cloud.redislabs.com:13108'
);

function createServer() {
  const app = express();

  //Middleware

  app.use(express.json());
  app.use(deserializeUser);

  app.use('/api/auth', authRoute);
  app.use('/api/users', userRoute);

  return app;
}

export default createServer;
