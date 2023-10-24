import { RolesModel } from '../../../../shared/domain/models/roles.model';
import { UserWithPassModel } from '../../../../shared/domain/models/users.model';

export interface CreateOrUpdateUserDto {
  user?: UserWithPassModel,
  roles: RolesModel[],
}
