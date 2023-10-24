import { UsersModel } from '../../../../shared/domain/models/users.model';

export interface GetUserByUsernameRepository {
  run(username: string): Promise<UsersModel>;
}
