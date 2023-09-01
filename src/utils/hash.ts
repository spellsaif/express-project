import argon2 from 'argon2';

export const hash = async (password: string) => {
  return argon2.hash(password);
};

export const verify = async (password: string, hashedPassword: string) => {
  return argon2.verify(hashedPassword, password);
};
