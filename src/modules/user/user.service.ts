import { hash } from '@utils/hash';
import prisma from '@utils/prisma';
import { CreateUser } from 'types';

export const createUser = async (data: CreateUser) => {
  //checking if email already exist
  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (user) {
    throw new Error('User already exists!');
  }

  data.password = await hash(data.password);

  const newUser = prisma.user.create({ data });

  return newUser;
};
