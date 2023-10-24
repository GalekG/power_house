import { Response } from 'express';

import { BaseResponse } from '../responses/base.response';

export class BaseErrorResponse {
  constructor(res: Response, error: any, status: number = 400) {
    new BaseResponse(res, {
      message: error.message,
      errors: error.errors,
    }, status);
  }
}
