import { ValidateJWTService } from '../domain/services/validateJTW.service';
import { ValidateJWT } from '../infra/jwt/validate.jwt';

export class ValidateJWTApp {
  async run(token: string, verify: boolean = true) {
    const validateJWTService = new ValidateJWTService(
      new ValidateJWT(),
    );

    return validateJWTService.run(token, verify);
  }
}
