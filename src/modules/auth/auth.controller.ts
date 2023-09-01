import { Request, Response } from 'express';
import { LoginUserInput, RegisterUserInput } from '@modules/auth/auth.schema';
import { createUser } from '@modules/user/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import sendMail from '@utils/mailer';
import prisma from '@utils/prisma';
import { verify } from '@utils/hash';
import { signAccessToken, signRefreshToken } from './auth.service';
import { verifyJwt } from '@utils/jwt';
import { redis } from '@utils/create-server';

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

  const verifyPassword = verify(user.password, password);

  if (!verifyPassword) {
    return res.status(400).send('Invalid Email or Password!');
  }

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user.id });

  return res.json({
    accessToken,
    refreshToken
  });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = req.headers['x-refresh'] as string;

  console.log(refreshToken);
  const decoded = await verifyJwt(refreshToken, 'REFRESH_TOKEN_PUBLIC_KEY');

  console.log(decoded);

  if (!decoded) {
    return res.status(401).send("couldn't refresh access token");
  }

  const session = await redis.get(decoded.userId);
  console.log(session);

  if (!session || !JSON.parse(session).valid) {
    return res.status(401).send("couldn't refresh access token");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: decoded.userId
    }
  });

  if (!user) {
    return res.status(401).send("couldn't refresh access token");
  }

  console.log(user);

  const accessToken = signAccessToken(user);

  return res.status(200).send({ accessToken });
};
