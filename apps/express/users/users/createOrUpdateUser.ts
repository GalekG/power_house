import { Response } from 'express';
import { CreateOrUpdateUserDto } from '../../../../src/users/users/domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserApp } from '../../../../src/users/users/app/createOrUpdateUser.app';
import { ResponseEdit } from '../../../../src/shared/infra/express/messages/responses/edit.response';
import { ValidationError } from '../../../../src/shared/infra/express/errors/validationError.error';
import { ValidationErrorResponse } from '../../../../src/shared/infra/express/messages/errors/validation.error';
import { UnexpectedErrorResponse } from '../../../../src/shared/infra/express/messages/errors/unexpected.error';
import { AuthRequest } from '../../../../src/shared/infra/express/requests/auth.request';

const CreateOrUpdateUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.params.id) || null;

    const request = req.body;

    const data: CreateOrUpdateUserDto = {
      roles: request.roles,
      user: {
        ...request.user,
        id: userId,
      },
    };

    const createOrUpdateUserApp = new CreateOrUpdateUserApp();

    const result = await createOrUpdateUserApp.run(data);

    return new ResponseEdit(res, !userId, result);
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationError) {
      return new ValidationErrorResponse(res, e);
    }
    return new UnexpectedErrorResponse(res, e);
  }
};

export {
  CreateOrUpdateUser,
};
