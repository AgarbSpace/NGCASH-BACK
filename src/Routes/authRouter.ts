import { Router } from 'express';
import authController from '../controllers/authController';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import signInFormSchema from '../schemas/signInFormSchema';
import signUpFormSchema from '../schemas/signUpFormSchema';

const authRouter: Router = Router();

authRouter.post('/signIn', validateSchemaMiddleware(signInFormSchema), authController.signIn);
authRouter.post('/signUp', validateSchemaMiddleware(signUpFormSchema), authController.signUp);

export default authRouter;
