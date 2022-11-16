import { Prisma } from '@prisma/client';
import { prisma } from '../../config';

async function create(data: Prisma.SessionsUncheckedCreateInput) {
  const { userId } = data;
  return prisma.sessions.upsert({
    where: {
      userId,
    },
    update: {
      token: data.token,
    },
    create: {
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      token: data.token,
    },
  });
}

const sessionsRepository = {
  create,
};

export default sessionsRepository;
