import { UsersModel } from '../../../../shared/domain/models/users.model';

export interface GetAllUsersRepository {
  run(): Promise<UsersModel[]>
}
