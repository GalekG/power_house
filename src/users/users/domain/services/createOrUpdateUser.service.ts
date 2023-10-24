import { CreateOrUpdateRecordRepository } from '../../../../shared/domain/repositories/createOrUpdateRecord.repository';
import { DeleteUserRolesNotAssignedRepository } from '../../../userRoles/domain/repositories/deleteUserRolesNotAssigned.repository';
import { GetUserRolesByUserIdRepository } from '../../../userRoles/domain/repositories/getUserRolesByUserId.repository';
import { CreateOrUpdateUserDto } from '../dtos/createOrUpdateUser.dto';

export class CreateOrUpdateUserService {
  constructor(
    private createOrUpdateRecord: CreateOrUpdateRecordRepository,
    private getUserRoles: GetUserRolesByUserIdRepository,
    private deleteUserRolesNotAssigned: DeleteUserRolesNotAssignedRepository,
  ) {}

  async run(data: CreateOrUpdateUserDto) {
    const userId = await this.createOrUpdateRecord.run(data.user, 'Users', data.user.id);

    // eliminar roles no asignados
    await this.deleteUserRolesNotAssigned.run(userId, data.roles && data.roles.length ? data.roles.map((userRole) => userRole.id) : []);

    if (data.roles && data.roles.length) {
      const userRoles = await this.getUserRoles.run(userId);

      // validación de roles nuevos y antiguos
      if (userRoles && userRoles.length) {
        for await (const role of data.roles) {
          if (!userRoles.map((userRole) => userRole.roleId).includes(role.id)) {
            await this.createOrUpdateRecord.run({ userId, roleId: role.id }, 'userRoles');
          }
        }
      } else {
        for await (const role of data.roles) {
          await this.createOrUpdateRecord.run({ userId, roleId: role.id }, 'userRoles');
        }
      }
    }

    return userId;
  }
}
