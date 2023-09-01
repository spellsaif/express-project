import { Request, Response } from 'express';
import { RegisterUserInput } from '@modules/auth/auth.schema';
import { createUser } from '@modules/user/user.service';

export const registerUserHandler = (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  try {
    const userData = req.body;

    return res.json(createUser(userData));
  } catch (e) {
    res.status(400);
  }
};
