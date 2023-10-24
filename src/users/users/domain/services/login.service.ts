import { LoginRepository } from '../repositories/login.repository';

export class LoginService {
  constructor(
    private login: LoginRepository,
  ) {}

  async run(username: string, password: string) {
    return this.login.run(username, password);
  }
}
