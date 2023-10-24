import { MachinesModel } from '../../shared/domain/models/machines.model';
import { CreateOrUpdateRecordService } from '../../shared/domain/services/createOrUpdateRecord.service';
import { CreateOrUpdateRecordMySql } from '../../shared/infra/mysql/createOrUpdateRecord.mysql';

export class CreateOrUpdateMachineApp {
  async run(data: MachinesModel, id?: number) {
    const createOrUpdateMachineService = new CreateOrUpdateRecordService<MachinesModel>(
      new CreateOrUpdateRecordMySql<MachinesModel>(),
    );

    return createOrUpdateMachineService.run(data, 'Machines', id);
  }
}
