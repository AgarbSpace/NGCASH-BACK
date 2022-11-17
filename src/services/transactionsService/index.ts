import { Transactions } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import accountsRepository from '../../repositories/accountsRepository';
import transactionsRepository from '../../repositories/transactionsRepository';
import usersRepository from '../../repositories/usersRepository';
import { notFoundError, serverError } from './errors';

type CreateTransaction = Pick<Transactions, 'debitedAccountId' | 'creditedAccountId' | 'value'>;

async function createTransasction(id: number, username: string, value: Decimal) {
  const user = await usersRepository.findByUsername(username);
  if (!user) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw notFoundError(username);
  }
  const transactionData: CreateTransaction = {
    debitedAccountId: id,
    creditedAccountId: user.id,
    value,
  };
  const transaction = transactionsRepository.create(transactionData);

  if (!transaction) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw serverError();
  }
}

async function getTransactions(userId: number) {
  const userTransactions = await transactionsRepository.findManyByUserId(userId);
  const userAccount = await accountsRepository.findByUserId(userId);
  if (!userTransactions) {
    return {
      transactions: [],
      balance: userAccount?.balance,
    };
  }

  return [
    ...userTransactions,
    { balance: userAccount?.balance },
  ];
}

async function getTransactionsByDate(date: Date, userId: number) {
  const userTransactions = await transactionsRepository.findManyByDate(date, userId);
  const userAccount = await accountsRepository.findByUserId(userId);
  if (!userTransactions) {
    return {
      transactions: [],
      balance: userAccount?.balance,
    };
  }

  return [
    ...userTransactions,
    { balance: userAccount?.balance },
  ];
}

async function getCashInTransactions(userId: number) {
  const userTransactions = await transactionsRepository.findCashInTransactions(userId);
  const userAccount = await accountsRepository.findByUserId(userId);
  if (!userTransactions) {
    return {
      transactions: [],
      balance: userAccount?.balance,
    };
  }

  return [
    ...userTransactions,
    { balance: userAccount?.balance },
  ];
}

async function getCashOutTransactions(userId: number) {
  const userTransactions = await transactionsRepository.findCashOutTransactions(userId);
  const userAccount = await accountsRepository.findByUserId(userId);
  if (!userTransactions) {
    return {
      transactions: [],
      balance: userAccount?.balance,
    };
  }

  return [
    ...userTransactions,
    { balance: userAccount?.balance },
  ];
}

class TransactionsService {
  public createTransasction;

  public getTransactions;

  public getTransactionsByDate;

  public getCashInTransactions;

  public getCashOutTransactions;

  constructor() {
    this.createTransasction = createTransasction;
    this.getTransactions = getTransactions;
    this.getTransactionsByDate = getTransactionsByDate;
    this.getCashInTransactions = getCashInTransactions;
    this.getCashOutTransactions = getCashOutTransactions;
  }
}

const transactionService = new TransactionsService();

export default transactionService;
