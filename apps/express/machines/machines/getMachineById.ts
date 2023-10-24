import { Response } from 'express';
import { AuthRequest } from '../../../../src/shared/infra/express/requests/auth.request';
import { UnexpectedErrorResponse } from '../../../../src/shared/infra/express/messages/errors/unexpected.error';
import { GetMachineByIdApp } from '../../../../src/machines/app/getMachineById.app';
import { BaseResponse } from '../../../../src/shared/infra/express/messages/responses/base.response';

const GetMachineById = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const getMachineByIdApp = new GetMachineByIdApp();

    const machine = await getMachineByIdApp.run(id);

    return new BaseResponse(res, machine);
  } catch (e) {
    return new UnexpectedErrorResponse(res, e);
  }
};

export {
  GetMachineById,
};
