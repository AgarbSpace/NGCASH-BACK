import { ApplicationError } from '../../protocols';

export function notFoundError(username?:string) :ApplicationError {
  return {
    name: 'NotFoundError',
    message: `Usuário ${username} não encontrado`,
  };
}

export function serverError() :ApplicationError {
  return {
    name: 'InternalServerError',
    message: 'Internal Server Error',
  };
}
