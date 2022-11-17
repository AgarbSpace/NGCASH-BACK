import { Decimal } from '@prisma/client/runtime';
import accountsRepository from '../../repositories/accountsRepository';
import usersRepository from '../../repositories/usersRepository';
import { invalidCredentialsError, notFoundError, unprocessableEntity } from './errors';

async function updateAccount(userId: number, username: string, value: Decimal) {
  const debitedUser = await usersRepository.findById(userId);

  if (!debitedUser) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw notFoundError();
  }

  if (debitedUser.username === username) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw invalidCredentialsError();
  }

  const debitedUserAccount = await accountsRepository.findByUserId(userId);

  if (!debitedUserAccount) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw notFoundError();
  }

  const newBalance = (Number(debitedUserAccount.balance) - Number(value));
  if (newBalance < 0) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw unprocessableEntity();
  }

  const creditedUser = await usersRepository.findByUsername(username);

  if (!creditedUser) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw notFoundError();
  }

  const creditedUserAccount = await accountsRepository.findByUserId(creditedUser.accountId);

  if (!creditedUserAccount) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw notFoundError();
  }

  const newCreditedBalance = (Number(creditedUserAccount.balance) + Number(value));

  await accountsRepository.updateBalance(debitedUserAccount.id, newBalance);
  await accountsRepository.updateBalance(creditedUserAccount.id, newCreditedBalance);
}

class AccountsService {
  public updateAccount;

  constructor() {
    this.updateAccount = updateAccount;
  }
}

const accountsService = new AccountsService();

export default accountsService;
