import { Prisma } from '@prisma/client';
import { prisma } from '../../config';

async function create(data: Prisma.TransactionsUncheckedCreateInput) {
  await prisma.transactions.create({
    data,
  });
}

async function findManyByUserId(userId: number) {
  const transactions = await prisma.transactions.findMany({
    where: {
      OR: [
        {
          creditedAccountId: userId,
        },
        {
          debitedAccountId: userId,
        },
      ],
    },
  });

  return transactions;
}

async function findManyByDate(date: Date, userId: number) {
  const transactions = await prisma.transactions.findMany({
    where: {
      createdAt: date,
      AND: {
        OR: [
          {
            creditedAccountId: userId,
          },
          {
            debitedAccountId: userId,
          },
        ],
      },
    },
  });

  return transactions;
}

async function findCashInTransactions(userId: number) {
  const transactions = await prisma.transactions.findMany({
    where: {
      creditedAccountId: userId,
    },
  });

  return transactions;
}

async function findCashOutTransactions(userId: number) {
  const transactions = await prisma.transactions.findMany({
    where: {
      debitedAccountId: userId,
    },
  });

  return transactions;
}

class TransactionsRepository {
  public create;

  public findManyByUserId;

  public findManyByDate;

  public findCashInTransactions;

  public findCashOutTransactions;

  constructor() {
    this.create = create;
    this.findManyByUserId = findManyByUserId;
    this.findManyByDate = findManyByDate;
    this.findCashInTransactions = findCashInTransactions;
    this.findCashOutTransactions = findCashOutTransactions;
  }
}

const transactionsRepository = new TransactionsRepository();

export default transactionsRepository;
