import * as Validator from 'validatorjs';
import { ValidationError } from '../../../shared/infra/express/errors/validationError.error';
import { ValidateDataRepository } from '../../../shared/domain/repositories/validateData.repository';

export class ValidateDataCreateOrUpdateUserValidator implements ValidateDataRepository {
  run(data: any): void {
    const rules = data.user && data.user.id ? {
      roles: 'required|array',
    } : {
      user: {
        username: 'required|string|max:30',
        identification: 'required|max:50',
        names: 'required|max:255',
        lastnames: 'required|max:255',
        weight: 'required|numeric',
        height: 'required|numeric',
      },
      roles: 'required|array',
    };

    const validation = new Validator(data, rules);

    if (validation.fails()) {
      throw new ValidationError(validation.errors.errors);
    }
  }
}
