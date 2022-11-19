import { ApplicationError } from '../../protocols';

export function duplicatedUsernameError(): ApplicationError {
  return {
    name: 'DuplicatedUsernameError',
    message: 'Já existe um usuário com esse nome',
  };
}

export function InvalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'Nome de usuário ou senha estão incorretos',
  };
}
