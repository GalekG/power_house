import { BaseModel } from './base.model';

export class MachinesModel extends BaseModel {
  name: string = null;

  description?: string = null;

  muscleGroup?: string = null;

  quantity?: number = 1;
}
