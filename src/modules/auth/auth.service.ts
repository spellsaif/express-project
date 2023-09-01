import { User } from '@prisma/client';
import { redis } from '@utils/create-server';
import { signJwt } from '@utils/jwt';
import { omit } from 'lodash';

export const signAccessToken = (user: User) => {
  const privateFields = [
    'password',
    'verificationCode',
    'verified',
    'passwordResetCode',
    'createdAt',
    'updatedAt'
  ];

  const payload = omit(user, privateFields);

  const accessToken = signJwt(payload, 'ACCESS_TOKEN_PRIVATE_KEY', {
    expiresIn: '15m'
  });

  return accessToken;
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  await createSession(userId);
  const refreshToken = signJwt({ userId }, 'REFRESH_TOKEN_PRIVATE_KEY', {
    expiresIn: '1y'
  });

  return refreshToken;
};

export const createSession = async (userId: string) => {
  const payload = JSON.stringify({
    valid: true
  });

  await redis.set(userId, payload);
};
