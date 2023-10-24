import { Response } from 'express';
import { AuthRequest } from '../../../../src/shared/infra/express/requests/auth.request';
import { UnexpectedErrorResponse } from '../../../../src/shared/infra/express/messages/errors/unexpected.error';
import { GetAllMachinesApp } from '../../../../src/machines/app/getAllMachines.app';
import { BaseResponse } from '../../../../src/shared/infra/express/messages/responses/base.response';

const GetAllMachines = async (_req: AuthRequest, res: Response) => {
  try {
    const getAllMachinesApp = new GetAllMachinesApp();

    const machines = await getAllMachinesApp.run();

    return new BaseResponse(res, machines);
  } catch (e) {
    return new UnexpectedErrorResponse(res, e);
  }
};

export {
  GetAllMachines,
};
