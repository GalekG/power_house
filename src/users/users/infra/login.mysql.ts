import * as bcrypt from 'bcrypt';
import { LoginRepository } from '../domain/repositories/login.repository';
import { getFirst } from '../../../shared/infra/mysql/db.mysql';
import { formatObject } from '../../../shared/utils/formatResponse';
import { UserWithPassModel } from '../../../shared/domain/models/users.model';

export class LoginMySql implements LoginRepository {
  async run(username: string, password: string): Promise<Boolean> {
    const user = formatObject(await getFirst<UserWithPassModel>('SELECT * FROM Users WHERE username = ?', [username])) as UserWithPassModel;

    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }
}
