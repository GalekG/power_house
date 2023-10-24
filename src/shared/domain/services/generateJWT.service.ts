import { UsersModel } from '../models/users.model';
import { GenerateJWTRepository } from '../repositories/generateJWT.repository';

export class GenerateJWTService {
  constructor(
    private generateJWT: GenerateJWTRepository,
  ) {}

  async run(user: UsersModel) {
    return this.generateJWT.run(user);
  }
}
