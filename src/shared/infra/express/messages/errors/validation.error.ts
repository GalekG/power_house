import { Response } from 'express';
import { ValidationError } from '../../errors/validationError.error';
import { BaseErrorResponse } from './base.error';

export class ValidationErrorResponse {
  constructor(res: Response, error: ValidationError) {
    new BaseErrorResponse(res, {
      message: error.message,
      errors: error.errors,
    }, error.statusCode);
  }
}
