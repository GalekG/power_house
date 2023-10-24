import { UsersModel } from '../../../shared/domain/models/users.model';
import { getFirst } from '../../../shared/infra/mysql/db.mysql';
import { formatObject } from '../../../shared/utils/formatResponse';
import { GetUserByUsernameRepository } from '../domain/repositories/getUserByUsername.repository';

export class GetUserByUsernameMySql implements GetUserByUsernameRepository {
  async run(username: string): Promise<UsersModel> {
    const user = await getFirst<UsersModel>(
      `SELECT
        *
      FROM
        Users
      WHERE
        Users.username = ?`,
      [username],
    );

    return user ? formatObject(user) as UsersModel : null;
  }
}
