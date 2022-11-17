import { ApplicationError } from '../protocols';

// eslint-disable-next-line import/prefer-default-export
export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthoriedError',
    message: 'You must be signed in to continue',
  };
}
