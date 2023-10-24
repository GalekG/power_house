import { GetUserRolesByUserIdRepository } from '../repositories/getUserRolesByUserId.repository';

export class GetUserRolesByUserIdService {
  constructor(
    private getUserRoles: GetUserRolesByUserIdRepository,
  ) {}

  async run(userId: number) {
    return this.getUserRoles.run(userId);
  }
}
