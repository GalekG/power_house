import { RolesModel } from '../../../shared/domain/models/roles.model';
import { GenerateJWTService } from '../../../shared/domain/services/generateJWT.service';
import { AuthError } from '../../../shared/infra/express/errors/authError.error';
import { GenerateJWT } from '../../../shared/infra/jwt/generate.jwt';
import { GetUserRolesByUserIdService } from '../../userRoles/domain/services/getUserRolesByUserId.service';
import { GetUserRolesByUserIdMySql } from '../../userRoles/infra/getUserRolesByUserId.mysql';
import { GetUserByUsernameService } from '../domain/services/getUserByUsername.service';
import { LoginService } from '../domain/services/login.service';
import { GetUserByUsernameMySql } from '../infra/getUserByUsername.mysql';
import { LoginMySql } from '../infra/login.mysql';

export class LoginApp {
  async run(username: string, password: string) {
    const loginService = new LoginService(
      new LoginMySql(),
    );

    const login = await loginService.run(username, password);

    if (!login) {
      throw new AuthError();
    }

    const getUserByUsernameService = new GetUserByUsernameService(
      new GetUserByUsernameMySql(),
    );

    const user = await getUserByUsernameService.run(username);

    const getUserRolesByUserIdService = new GetUserRolesByUserIdService(
      new GetUserRolesByUserIdMySql(),
    );

    const userRoles: any[] = await getUserRolesByUserIdService.run(user.id);

    const roles: RolesModel[] = userRoles.map((userRole) => userRole.roles);

    const generateJWTService = new GenerateJWTService(
      new GenerateJWT(),
    );

    const token = await generateJWTService.run(user);

    return { user, roles, token };
  }
}
