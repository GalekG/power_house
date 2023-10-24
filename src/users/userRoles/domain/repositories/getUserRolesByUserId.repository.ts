import { UserRolesWithRolesModel } from '../../../../shared/domain/models/userRoles.model';

export interface GetUserRolesByUserIdRepository {
  run(userId: number): Promise<UserRolesWithRolesModel[]>
}
