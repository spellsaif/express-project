import { Router } from 'express';
import { registerUserHandler } from '@modules/auth/auth.controller';

const authRoute = Router();

authRoute.get('/', (_, res) => {
  return res.send('Auth Route');
});

authRoute.post('/register', registerUserHandler);

export default authRoute;
