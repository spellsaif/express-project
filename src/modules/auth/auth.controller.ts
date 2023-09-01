import { Request } from 'express';
import { RegisterUserInput } from '@modules/auth/auth.schema';

export const registerUserHandler = (
  req: Request<{}, {}, RegisterUserInput>
) => {
  const data = req.body;
  return data;
};
