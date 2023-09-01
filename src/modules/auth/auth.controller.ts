import { Request, Response } from 'express';
import { RegisterUserInput } from '@modules/auth/auth.schema';

export const registerUserHandler = (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  const data = req.body;
  return res.json(data);
};
