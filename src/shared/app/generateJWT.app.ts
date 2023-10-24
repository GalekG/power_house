import { UsersModel } from '../domain/models/users.model';
import { GenerateJWTService } from '../domain/services/generateJWT.service';
import { GenerateJWT } from '../infra/jwt/generate.jwt';

export class GenerateJWTApp {
  async run(user: UsersModel) {
    const generateJWTService = new GenerateJWTService(
      new GenerateJWT(),
    );
    return generateJWTService.run(user);
  }
}
