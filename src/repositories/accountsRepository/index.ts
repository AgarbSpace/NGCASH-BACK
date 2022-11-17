import { Prisma } from '@prisma/client';
import { prisma } from '../../config';

async function createAccount(data: Prisma.AccountsUncheckedCreateInput) {
  return prisma.accounts.create({
    data,
  });
}

async function findByUserId(userId: number) {
  return prisma.accounts.findUnique({
    where: {
      id: userId,
    },
  });
}

async function updateBalance(userId: number, newBalance: number) {
  return prisma.accounts.update({
    where: {
      id: userId,
    },
    data: {
      balance: newBalance,
    },
  });
}
class AccountsRepository {
  public createAccount;

  public findByUserId;

  public updateBalance;

  constructor() {
    this.createAccount = createAccount;
    this.findByUserId = findByUserId;
    this.updateBalance = updateBalance;
  }
}

const accountsRepository = new AccountsRepository();

export default accountsRepository;
