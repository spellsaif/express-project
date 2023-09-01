import { hash } from '@utils/hash';
import prisma from '@utils/prisma';
import { CreateUser } from 'types';

export const createUser = async (data: CreateUser) => {
  data.password = await hash(data.password);

  return prisma.user.create({ data });
};
