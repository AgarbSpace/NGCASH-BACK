import { ApplicationError } from '../../protocols';

export function notFoundError(username?:string) :ApplicationError {
  return {
    name: 'NotFoundError',
    message: `User ${username} not found`,
  };
}

export function serverError() :ApplicationError {
  return {
    name: 'InternalServerError',
    message: 'Internal Server Error',
  };
}
