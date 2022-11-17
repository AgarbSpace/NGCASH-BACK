import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from '../errors';

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

// eslint-disable-next-line max-len, consistent-return
export default async function authenticateToken(request: Request, response: Response, next: NextFunction): Promise<any> {
  const authHeader = request.header('Authorization');
  if (!authHeader) {
    return generateUnauthorizedResponse(response);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return generateUnauthorizedResponse(response);
  }

  try {
    const { userId } = jwt.verify(token, 'vcnuncavaisaber') as JwtPayload;
    response.locals.userId = userId;
    next();
  } catch (err) {
    return generateUnauthorizedResponse(response);
  }
}

type JwtPayload = {
  userId: number;
};
