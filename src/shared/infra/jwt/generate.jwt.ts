import * as jsonwebtoken from 'jsonwebtoken';
import { GenerateJWTRepository } from '../../domain/repositories/generateJWT.repository';
import { UsersModel } from '../../domain/models/users.model';

const secret = process.env.SECRET;

export class GenerateJWT implements GenerateJWTRepository {
  async run(user: UsersModel): Promise<string> {
    return jsonwebtoken.sign(user, secret, {
      expiresIn: '1h',
    });
  }
}
