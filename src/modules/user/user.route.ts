import validate from '@middlewares/schema-validate';
import { Router } from 'express';
import {
  forgotPasswordHandler,
  getCurrentUserHandler,
  passwordResetHandler,
  verifyUserHandler
} from './user.controller';
import {
  forgotPasswordSchema,
  passwordResetSchema,
  verifyUserSchema
} from './user.schema';

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

userRoute.post(
  '/resetpassword/:passwordResetCode/:id',
  validate(passwordResetSchema),
  passwordResetHandler
);

userRoute.get('/me', getCurrentUserHandler);

export default userRoute;
