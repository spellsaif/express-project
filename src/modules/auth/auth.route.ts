import { Router } from 'express';
import { registerUserHandler } from '@modules/auth/auth.controller';
import validate from '@middlewares/schema-validate';
import { registerUserSchema } from '@modules/auth/auth.schema';

const authRoute = Router();

authRoute.get('/', (_, res) => {
  return res.send('Auth Route');
});

authRoute.post('/register', validate(registerUserSchema), registerUserHandler);

export default authRoute;
