import { ValidationCustom } from '../../../../shared/infra/express/errors/validationCustom.error';
import { GetUserByUsernameRepository } from '../repositories/getUserByUsername.repository';

export class ValidateIfUserExistsByUsernameService {
  constructor(
    private getUserByUsername: GetUserByUsernameRepository,
  ) {}

  async run(username: string, id?: number) {
    const user = await this.getUserByUsername.run(username);
    const userExists = !!(!!user && (!id || id !== user.id));
    if (userExists) {
      throw new ValidationCustom({ username: ['unique'], user: ['exists'] });
    }
  }
}
