import { RolesModel } from '../../../shared/domain/models/roles.model';
import { UserRolesWithRolesModel } from '../../../shared/domain/models/userRoles.model';
import { findMany } from '../../../shared/infra/mysql/db.mysql';
import { generateSelectFieldsSQL } from '../../../shared/utils/formatData.sql';
import { GetUserRolesByUserIdRepository } from '../domain/repositories/getUserRolesByUserId.repository';

export class GetUserRolesByUserIdMySql implements GetUserRolesByUserIdRepository {
  async run(userId: number): Promise<UserRolesWithRolesModel[]> {
    const selectRoles = generateSelectFieldsSQL('roles', RolesModel);
    const sql = `SELECT
      UserRoles.*,
      ${selectRoles}
    FROM
      UserRoles
      INNER JOIN Roles ON UserRoles.roleId = Roles.id
    WHERE
      UserRoles.userId = ?`;
    return findMany(sql, [userId]);
  }
}
