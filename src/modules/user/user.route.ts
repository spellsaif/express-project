import validate from '@middlewares/schema-validate';
import { Router } from 'express';
import { forgotPasswordHandler, verifyUserHandler } from './user.controller';
import { forgotPasswordSchema, verifyUserSchema } from './user.schema';

const userRoute = Router();

userRoute.get('/', (_, res) => {
  return res.send('User Route');
});

userRoute.get(
  '/verification/:verificationCode/:id',
  validate(verifyUserSchema),
  verifyUserHandler
);

userRoute.post(
  '/forgotpassword',
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

export default userRoute;
