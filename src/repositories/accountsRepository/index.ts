import { Prisma } from '@prisma/client';
import { prisma } from '../../config';

async function createAccount(data: Prisma.AccountsUncheckedCreateInput) {
  return prisma.accounts.create({
    data,
  });
}

class AccountsRepository {
  public createAccount;

  constructor() {
    this.createAccount = createAccount;
  }
}

const accountsRepository = new AccountsRepository();

export default accountsRepository;
