import { Router } from 'express';

const userRoute = Router();

userRoute.get('/', (_, res) => {
  return res.send('User Route');
});

export default userRoute;
