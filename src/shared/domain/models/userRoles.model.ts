import { BaseModel } from './base.model';
import { RolesModel } from './roles.model';

export class UserRolesModel extends BaseModel {
  userId: number = null;

  roleId: number = null;
}

export interface UserRolesWithRolesModel extends UserRolesModel {
  role: RolesModel;
}
