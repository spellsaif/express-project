import argon2 from 'argon2';

export const hash = async (password: string) => {
  return argon2.hash(password);
};

export const verify = (hashedPassword: string, password: string) => {
  return argon2.verify(hashedPassword, password);
};
