import { UsersModel } from '../models/users.model';

export interface GenerateJWTRepository {
  run(user: UsersModel): Promise<string>
}
