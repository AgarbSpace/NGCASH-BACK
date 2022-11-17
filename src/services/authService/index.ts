import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users } from '@prisma/client';
import usersRepository from '../../repositories/usersRepository';
import accountsRepository from '../../repositories/accountsRepository';
import { duplicatedUsernameError, InvalidCredentialsError } from './errors';
import exclude from '../../utils/prismaUtils';

dotenv.config();

export type AuthParams = Pick<Users, 'username' | 'password'>;
type GetUserOrFailResult = Pick<Users, 'username' | 'password' | 'id'>;

async function validateUniqueUsernameOrFail(username: string) {
  const userWithSameUsername = await usersRepository.findByUsername(username);
  if (userWithSameUsername) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw duplicatedUsernameError();
  }
}

async function getUserOrFail(username: string): Promise<GetUserOrFailResult> {
  const user = await usersRepository.findByUsername(username);
  if (!user) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw InvalidCredentialsError();
  }

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw InvalidCredentialsError();
  }
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, 'vcnuncavaisaber', { expiresIn: '24h' });
  return token;
}

async function createUser({ username, password }: AuthParams): Promise<Users> {
  await validateUniqueUsernameOrFail(username);

  const hashedPassword = await bcrypt.hash(password, 12);
  const object = {};
  const account = await accountsRepository.createAccount(object);
  return usersRepository.create({
    username,
    password: hashedPassword,
    accountId: account.id,
  });
}

async function signIn(data: AuthParams) {
  const { username, password } = data;

  const user = await getUserOrFail(username);
  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, password),
    token,
  };
}

class AuthService {
  public createUser;

  public signIn;

  constructor() {
    this.createUser = createUser;
    this.signIn = signIn;
  }
}

const authService = new AuthService();

export default authService;
