import { Response } from 'express';

import { BaseErrorResponse } from './base.error';

export class NotFoundErrorResponse {
  constructor(res: Response, message: string = 'Recurso no encontrado') {
    new BaseErrorResponse(res, {
      message,
    }, 404);
  }
}
