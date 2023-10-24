import { BaseModel } from './base.model';

export class UsersModel extends BaseModel {
  username: string = null;

  identification: string = null;

  names: string = null;

  lastnames: string = null;

  birthdate?: string = null;

  email?: string = null;

  address?: string = null;

  weight: number = null; // KG

  height: number = null; // CMS

  bloodType?: string = null;

  genderId?: number = null;
}

export interface UserWithPassModel extends UsersModel {
  password?: string;
}
