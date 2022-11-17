import { Router } from 'express';
import transactionsController from '../controllers/transactionsController';
import authenticateToken from '../middlewares/tokenAuthMiddleware';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import getTransactionsBySchema from '../schemas/getTransactionBySchema';
import transactionFormSchema from '../schemas/transactionFormSchema';

const transactionsRouter = Router();

transactionsRouter
  .all('/*', authenticateToken)
  .get('/transactions', validateSchemaMiddleware(getTransactionsBySchema), transactionsController.getTransactions)
  .post('/transactions', validateSchemaMiddleware(transactionFormSchema), transactionsController.postTransactions);

export default transactionsRouter;
