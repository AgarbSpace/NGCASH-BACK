import { Request, Response } from 'express';
import httpStatus from 'http-status';
import accountsService from '../services/accountsService';
import transactionService from '../services/transactionsService';

class TransactionsController {
  public getTransactions;

  public postTransactions;

  constructor() {
    this.getTransactions = async (request: Request, response: Response) => {
      const { userId } = response.locals;
      const { date } = request.body;
      const { cashIn } = request.body;
      const { cashOut } = request.body;
      if (date) {
        const transactionsByDate = await transactionService.getTransactionsByDate(date, userId);
        return response.status(httpStatus.OK).send(transactionsByDate);
      }

      if (cashIn) {
        const cashInTransactions = await transactionService.getCashInTransactions(userId);
        return response.status(httpStatus.OK).send(cashInTransactions);
      }

      if (cashOut) {
        const cashOutTransactions = await transactionService.getCashOutTransactions(userId);
        return response.status(httpStatus.OK).send(cashOutTransactions);
      }

      const transactions = await transactionService.getTransactions(userId);
      return response.status(httpStatus.OK).send(transactions);
    };
    this.postTransactions = async (request: Request, response: Response) => {
      const { userId } = response.locals;
      const { value, username } = request.body;
      await accountsService.updateAccount(userId, username, value);
      await transactionService.createTransasction(userId, username, value);
      return response.status(httpStatus.CREATED).send('Successful Transaction');
    };
  }
}

const transactionsController = new TransactionsController();

export default transactionsController;
