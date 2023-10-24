import { executeQuery } from '../../../shared/infra/mysql/db.mysql';
import { DeleteUserRolesNotAssignedRepository } from '../domain/repositories/deleteUserRolesNotAssigned.repository';

export class DeleteUserRolesNotAssignedMySql implements DeleteUserRolesNotAssignedRepository {
  async run(userId: number, rolesIds?: number[]) {
    const auxSql = rolesIds && rolesIds.length ? `AND roleId NOT IN (${rolesIds.join(',')})` : '';
    return executeQuery(`DELETE FROM UserRoles WHERE userId = ? ${auxSql}`, [userId]);
  }
}
