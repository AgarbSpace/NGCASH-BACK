import { ApplicationError } from '../../protocols';

// eslint-disable-next-line import/prefer-default-export
export function notFoundError() :ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'Account not found',
  };
}

export function unprocessableEntity(): ApplicationError {
  return {
    name: 'UnprocessableEntity',
    message: 'Value is bigger than your balance',
  };
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'You cannot make a transaction for yourself',
  };
}
