import { Request, Response } from 'express';
import authService, { AuthParams } from '../services/authService';

class AuthController {
  public signIn;

  public signUp;

  constructor() {
    this.signIn = async (request: Request, response: Response) => {
      const data: AuthParams = request.body;
      const userData = await authService.signIn(data);
      delete userData.user.password;
      response.status(201).send(userData);
    };
    this.signUp = async (request: Request, response: Response) => {
      const data: AuthParams = request.body;
      await authService.createUser(data);
      response.status(200).send('User created successfuly');
    };
  }
}

const authController = new AuthController();

export default authController;
