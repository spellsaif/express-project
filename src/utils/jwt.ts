import jwt from 'jsonwebtoken';

export const signJwt = (
  payload: Object,
  keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
  options?: jwt.SignOptions | undefined
) => {
  const signingKey = Buffer.from(process.env[keyName]!, 'base64').toString(
    'ascii'
  );

  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY'
): T | null => {
  const publicKey = Buffer.from(process.env[keyName]!, 'base64').toString(
    'ascii'
  );

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
};
