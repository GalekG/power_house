import * as jsonwebtoken from 'jsonwebtoken';
import { ValidateJWTRepository } from '../../domain/repositories/validateJWT.repository';
import { UsersModel } from '../../domain/models/users.model';

const secret = process.env.SECRET;

export class ValidateJWT implements ValidateJWTRepository {
  async run(token: string, verify: boolean = true): Promise<UsersModel> {
    if (verify) {
      const decodedToken = jsonwebtoken.verify(token, secret);
      return decodedToken as UsersModel;
    }
    const decodedToken = jsonwebtoken.decode(token) as UsersModel;
    return decodedToken;
  }
}
