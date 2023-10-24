import { Router } from 'express';
import { GetAllMachines } from './machines/getAllMachines';
import { CreateOrUpdateMachine } from './machines/createOrUpdateMachine';
import { GetMachineById } from './machines/getMachineById';

const machinesRouter = Router();

const basePath = '/machines';

machinesRouter.get(`${basePath}`, GetAllMachines);
machinesRouter.get(`${basePath}/:id`, GetMachineById);
machinesRouter.post(`${basePath}`, CreateOrUpdateMachine);
machinesRouter.put(`${basePath}/:id`, CreateOrUpdateMachine);

export {
  machinesRouter,
};
