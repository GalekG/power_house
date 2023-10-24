import * as bcrypt from 'bcrypt';
import { ValidateDataService } from '../../../shared/domain/services/validateData.service';
import { CreateOrUpdateRecordMySql } from '../../../shared/infra/mysql/createOrUpdateRecord.mysql';
import { DeleteUserRolesNotAssignedMySql } from '../../userRoles/infra/deleteUserRolesNotAssigned.mysql';
import { GetUserRolesByUserIdMySql } from '../../userRoles/infra/getUserRolesByUserId.mysql';
import { CreateOrUpdateUserDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserService } from '../domain/services/createOrUpdateUser.service';
import { ValidateIfUserExistsByUsernameService } from '../domain/services/validateIfUserExistsByUsername.service';
import { GetUserByUsernameMySql } from '../infra/getUserByUsername.mysql';
import { ValidateDataCreateOrUpdateUserValidator } from '../infra/validateCreateOrUpdateUser.validator';

export class CreateOrUpdateUserApp {
  async run(data: CreateOrUpdateUserDto) {
    const validateData = new ValidateDataService(
      new ValidateDataCreateOrUpdateUserValidator(),
    );

    validateData.run(data);

    const validateIfUserExistsByUsernameService = new ValidateIfUserExistsByUsernameService(
      new GetUserByUsernameMySql(),
    );

    await validateIfUserExistsByUsernameService.run(data.user.username, data.user.id);

    if (data.user.password) {
      const salt = await bcrypt.genSalt();
      data.user.password = await bcrypt.hash(data.user.password, salt);
    } else {
      delete data.user.password;
    }

    const createOrUpdateUserService = new CreateOrUpdateUserService(
      new CreateOrUpdateRecordMySql(),
      new GetUserRolesByUserIdMySql(),
      new DeleteUserRolesNotAssignedMySql(),
    );

    return createOrUpdateUserService.run(data);
  }
}
