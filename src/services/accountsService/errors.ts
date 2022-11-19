import { ApplicationError } from '../../protocols';

// eslint-disable-next-line import/prefer-default-export
export function notFoundError() :ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'Conta destinatária não encontrada',
  };
}

export function unprocessableEntity(): ApplicationError {
  return {
    name: 'UnprocessableEntity',
    message: 'Valor a ser transferido é maior que o saldo',
  };
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Você não pode fazer transações para si mesmo',
  };
}
