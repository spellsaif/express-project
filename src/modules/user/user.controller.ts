import sendMail from '@utils/mailer';
import prisma from '@utils/prisma';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import {
  ForgotPasswordInput,
  PasswordResetInput,
  VerifyUserParams
} from './user.schema';

export const verifyUserHandler = async (
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

export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  const { email } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!user) {
    return res
      .status(200)
      .send('Reset Password Link has been sent to your email! ');
  }

  if (!user.verified) {
    return res.status(400).send('Verify User first! ');
  }

  const passwordResetCode = nanoid();

  await prisma.user.update({
    where: {
      email
    },
    data: {
      passwordResetCode
    }
  });

  await sendMail({
    from: 'test@test.com',
    to: email,
    subject: 'Reset Your Password',
    text: `Password Reset Code: ${passwordResetCode} ID: ${user.id}`
  });

  return res
    .status(200)
    .send('Reset Password Link has been sent to your email! ');
};

export const passwordResetHandler = async (
  req: Request<PasswordResetInput['params'], {}, PasswordResetInput['body']>,
  res: Response
) => {
  const { passwordResetCode, id } = req.params;
  const { newPassword } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  if (!user) {
    return res.status(400).send('Invliad Password Reset Code!');
  }

  if (user.passwordResetCode !== passwordResetCode || !user.passwordResetCode) {
    return res.status(400).send('Invliad Password Reset Code!');
  }

  await prisma.user.update({
    where: {
      id
    },
    data: {
      password: newPassword,
      passwordResetCode: null
    }
  });

  return res.status(200).send('Password has been reset successfully!');
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  console.log(res.locals.user);
  return res.send(res.locals.user);
};
