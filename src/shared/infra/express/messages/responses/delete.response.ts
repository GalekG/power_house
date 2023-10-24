import { Response } from 'express';
import { BaseResponse } from './base.response';

export class DeleteResponse {
  constructor(res: Response) {
    new BaseResponse(res, { message: 'Registro eliminado correctamente' });
  }
}
