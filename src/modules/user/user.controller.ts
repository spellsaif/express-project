import prisma from '@utils/prisma';
import { Request, Response } from 'express';
import { VerifyUserParams } from './user.schema';

export const verifyUserHanlder = async (
  req: Request<VerifyUserParams>,
  res: Response
) => {
  const { verificationCode, id } = req.params;

  //find user
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  if (!user) {
    return res.status(400).send('Invalid verification code');
  }

  //verifying verification code
  if (user.verificationCode !== verificationCode) {
    return res.status(400).send('Invalid verification code');
  }

  //Checking if user is already verified
  if (user.verified) {
    return res.status(400).send('User is already Verified');
  }

  await prisma.user.update({
    where: {
      id
    },

    data: {
      verified: true
    }
  });

  return res.status(200).send('User Succefully Verified!');
};
