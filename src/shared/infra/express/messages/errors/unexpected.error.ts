import { Response } from 'express';

import { BaseErrorResponse } from './base.error';

export class UnexpectedErrorResponse {
  constructor(res: Response, error: any = null) {
    const response: any = {
      message: 'core.messages.unexpectedError',
    };

    const debug = process.env.DEBUG;

    if (debug.toLowerCase() === 'true') {
      response.errors = error;
    }

    new BaseErrorResponse(res, response, 500);
  }
}
