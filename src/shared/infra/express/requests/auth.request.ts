import { Request } from 'express';
import { UsersModel } from '../../../domain/models/users.model';

export interface AuthRequest extends Request {
  user: UsersModel;
  query: any;
  params: any;
  headers: any;
  file:any;
  files:any;
}
