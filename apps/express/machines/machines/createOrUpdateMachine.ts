import { Response } from 'express';
import { AuthRequest } from '../../../../src/shared/infra/express/requests/auth.request';
import { UnexpectedErrorResponse } from '../../../../src/shared/infra/express/messages/errors/unexpected.error';
import { MachinesModel } from '../../../../src/shared/domain/models/machines.model';
import { CreateOrUpdateMachineApp } from '../../../../src/machines/app/createOrUpdateMachine.app';
import { ResponseEdit } from '../../../../src/shared/infra/express/messages/responses/edit.response';

const CreateOrUpdateMachine = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id ? req.params.id : null;

    const request = req.body;

    const data: MachinesModel = {
      name: request.name,
      description: request.description,
      muscleGroup: request.muscleGroup,
      quantity: request.quantity,
    };

    const createOrUpdateMachineApp = new CreateOrUpdateMachineApp();

    const machineId = await createOrUpdateMachineApp.run(data, id);

    return new ResponseEdit(res, !id, { id: machineId });
  } catch (e) {
    return new UnexpectedErrorResponse(res, e);
  }
};

export {
  CreateOrUpdateMachine,
};
