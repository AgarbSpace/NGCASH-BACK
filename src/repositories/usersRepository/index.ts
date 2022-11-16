import { Prisma } from '@prisma/client';
import { prisma } from '../../config';

async function create(data: Prisma.UsersUncheckedCreateInput) {
  return prisma.users.create({
    data: {
      username: data.username,
      password: data.password,
      accountId: data.accountId,
    },
  });
}

async function findByUsername(username: string, select?: Prisma.UsersSelect) {
  const params: Prisma.UsersFindUniqueArgs = {
    where: {
      username,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
}

class UsersRepository {
  public create;

  public findByUsername;

  constructor() {
    this.create = create;
    this.findByUsername = findByUsername;
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
