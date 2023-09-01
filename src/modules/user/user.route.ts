import validate from '@middlewares/schema-validate';
import { Router } from 'express';
import { verifyUserHanlder } from './user.controller';
import { verifyUserSchema } from './user.schema';

const userRoute = Router();

userRoute.get('/', (_, res) => {
  return res.send('User Route');
});

userRoute.get(
  '/:verificationCode/:id',
  validate(verifyUserSchema),
  verifyUserHanlder
);

export default userRoute;
