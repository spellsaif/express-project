import { Request, Response } from 'express';
import { RegisterUserInput } from '@modules/auth/auth.schema';
import { createUser } from '@modules/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  try {
    const userData = req.body;

    const user = await createUser(userData);
    return res.status(201).json(user);
  } catch (e: unknown) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002')
        return res.status(400).send('User Already Exists!');
    }

    return res.status(400).send('Unknown Error Occured!');
  }
};
