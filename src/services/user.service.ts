import { prisma } from '../lib/prismadb';

export const checkExistingUser = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createNewUser = (
  email: string,
  hashedPassword: string,
  name: string
) =>
  prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
