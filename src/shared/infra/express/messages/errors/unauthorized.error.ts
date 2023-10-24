import { Response } from 'express';

import { BaseErrorResponse } from './base.error';

export class UnauthorizedErrorResponse {
  constructor(res: Response) {
    new BaseErrorResponse(res, {
      message: 'No Autorizado',
    }, 401);
  }
}
