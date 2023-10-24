import { Response } from 'express';

export class BaseResponse {
  constructor(res: Response, data: any = null, status = 200) {
    if (data) {
      res.status(status).json(data);
    } else {
      res.status(status).json();
    }
  }
}
