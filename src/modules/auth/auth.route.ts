import { Router } from 'express';
import {
  loginUserHandler,
  registerUserHandler
} from '@modules/auth/auth.controller';
import validate from '@middlewares/schema-validate';
import { loginUserSchema, registerUserSchema } from '@modules/auth/auth.schema';

const authRoute = Router();

authRoute.get('/', (_, res) => {
  return res.send('Auth Route');
});

authRoute.post('/register', validate(registerUserSchema), registerUserHandler);
authRoute.post('/login', validate(loginUserSchema), loginUserHandler);

export default authRoute;
