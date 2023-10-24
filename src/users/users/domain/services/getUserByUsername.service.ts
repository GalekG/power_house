import { UserWithPassModel } from '../../../../shared/domain/models/users.model';
import { GetUserByUsernameRepository } from '../repositories/getUserByUsername.repository';

export class GetUserByUsernameService {
  constructor(
    private getUserByUsername: GetUserByUsernameRepository,
  ) {}

  async run(username: string) {
    const user: UserWithPassModel = await this.getUserByUsername.run(username);
    delete user.password;
    return user;
  }
}
