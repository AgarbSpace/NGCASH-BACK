import { Router } from 'express';
import authRouter from './authRouter';
import transactionsRouter from './transactionsRouter';

const router:Router = Router();

router.use(authRouter);
router.use(transactionsRouter);

export default router;
