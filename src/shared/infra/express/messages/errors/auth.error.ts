import { Response } from 'express';

import { BaseErrorResponse } from './base.error';

export class AuthErrorResponse {
  constructor(res: Response) {
    new BaseErrorResponse(res, {
      message: 'Autenticación incorrecta o usuario no Autorizado',
    }, 401);
  }
}
