import { User } from '@prisma/client';
import { redis } from '@utils/create-server';
import { signJwt } from '@utils/jwt';

export const signAccessToken = (user: User) => {
  const payload = user;

  const accessToken = signJwt(payload, 'ACCESS_TOKEN_PRIVATE_KEY');

  return accessToken;
};

export const signRefreshToken = async (userId: string) => {
  await createSession(userId);
  const refreshToken = signJwt(userId, 'REFRESH_TOKEN_PRIVATE_KEY');

  return refreshToken;
};

export const createSession = async (userId: string) => {
  const payload = JSON.stringify({
    valid: true
  });

  await redis.set(userId, payload);
};
