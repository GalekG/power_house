import { Response } from 'express';
import { AuthRequest } from '../requests/auth.request';
import { ValidateJWTApp } from '../../../app/validateJWT.app';
import { UnauthorizedErrorResponse } from '../messages/errors/unauthorized.error';
import { UsersModel } from '../../../domain/models/users.model';

async function authMiddleware(req: AuthRequest, res: Response, next) {
  try {
    const { headers } = req;

    if (!headers) {
      return new UnauthorizedErrorResponse(res);
    }

    headers.authorization = (headers.Authorization ?? headers.authorization) as string;

    if (!headers.authorization) {
      return new UnauthorizedErrorResponse(res);
    }

    if (headers.role_id === 'null') {
      headers.role_id = null;
    }

    if (headers.roleid === 'null') {
      headers.roleId = null;
    }

    headers.roleId = headers.role_id ?? headers.roleid;

    const token = headers.authorization.replace('Bearer ', '');

    let user: UsersModel = null;

    const validateJWTApp = new ValidateJWTApp();

    try {
      user = await validateJWTApp.run(token);
    } catch (error) {
      user = await validateJWTApp.run(token, false);
    }

    if (!user || !user.id) {
      return new UnauthorizedErrorResponse(res);
    }

    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    return new UnauthorizedErrorResponse(res);
  }
}

export {
  authMiddleware,
};
