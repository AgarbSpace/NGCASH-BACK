import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

// eslint-disable-next-line consistent-return
export default function handleApplicationErrors(
  err: ApplicationError,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: any,
) {
  if (err.name === 'DuplicatedUsernameError') {
    return response.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'InvalidCredentialsError') {
    return response.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(err);
  response.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
