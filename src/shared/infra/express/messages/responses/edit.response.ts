import { Response } from 'express';
import { BaseResponse } from './base.response';

export class ResponseEdit {
  constructor(res: Response, created: boolean, data: any = null) {
    const message = created ? 'Registro almacenado correctamente' : 'Registro actualizado correctamente';

    new BaseResponse(res, data ? { message, data } : { message });
  }
}
