import { GetAllUsersRepository } from '../repositories/getAllUsers.repository';

export class GetAllUsersService {
  constructor(
    private getAllUsers: GetAllUsersRepository,
  ) {}

  async run() {
    return this.getAllUsers.run();
  }
}
