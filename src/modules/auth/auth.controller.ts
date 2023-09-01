import { Request, Response } from 'express';
import { LoginUserInput, RegisterUserInput } from '@modules/auth/auth.schema';
import { createUser } from '@modules/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import sendMail from '@utils/mailer';
import prisma from '@utils/prisma';
import { verify } from '@utils/hash';
import { signAccessToken, signRefreshToken } from './auth.service';

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response
) => {
  try {
    const userData = req.body;

    const user = await createUser(userData);
    await sendMail({
      from: 'test@test.com',
      to: user.email,
      subject: 'Verify Account',
      text: `<h1>Verification Code: ${user.verificationCode} ID: ${user.id} </h1>`
    });
    return res.status(201).json(user);
  } catch (e: unknown) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002')
        return res.status(400).send('User Already Exists!');
    }

    return res.status(400).send('Unknown Error Occured!');
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!user) {
    return res.status(400).send('Invalid Email or Password!');
  }

  if (!user.verified) {
    return res.status(400).send('User is not verified!');
  }

  console.log('hash: ', user.password, 'plain: ', password);

  const verifyPassword = verify(user.password, password);

  if (!verifyPassword) {
    return res.status(400).send('Invalid Email or Password!');
  }

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken(user.id);

  return res.json({
    accessToken,
    refreshToken
  });
};
