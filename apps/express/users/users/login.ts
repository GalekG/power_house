import { Response } from 'express';
import { LoginApp } from '../../../../src/users/users/app/login.app';
import { AuthRequest } from '../../../../src/shared/infra/express/requests/auth.request';
import { BaseResponse } from '../../../../src/shared/infra/express/messages/responses/base.response';
import { AuthError } from '../../../../src/shared/infra/express/errors/authError.error';
import { AuthErrorResponse } from '../../../../src/shared/infra/express/messages/errors/auth.error';
import { UnexpectedErrorResponse } from '../../../../src/shared/infra/express/messages/errors/unexpected.error';

const Login = async (req: AuthRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    const loginApp = new LoginApp();

    const result = await loginApp.run(username, password);

    return new BaseResponse(res, { ...result, message: 'Bienvenido' });
  } catch (e) {
    console.log(e);
    if (e instanceof AuthError) {
      return new AuthErrorResponse(res);
    }
    return new UnexpectedErrorResponse(res, e);
  }
};

export { Login };
