import { NextFunction, Request, Response } from 'express';

export default function validateSchemaMiddleware(schema: any) {
  // eslint-disable-next-line consistent-return
  return (request: Request, response: Response, next: NextFunction) => {
    const validation = schema.validate(request.body);
    if (validation.error) {
      const error = validation.error.details.map((validationError: any) => validationError.message);
      const { value } = validation.error.details[0].context;
      if (error[0] === `"password" with value "${value}" fails to match the required pattern: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/`) {
        error[0] = 'Password must contain at least one capital letter, one number and 8 characters!!';
      }
      return response.status(422).send(error);
    }
    next();
  };
}
