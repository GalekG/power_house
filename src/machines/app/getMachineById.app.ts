import { MachinesModel } from '../../shared/domain/models/machines.model';
import { GetRecordByIdService } from '../../shared/domain/services/getRecordById.service';
import { GetRecordByIdMySql } from '../../shared/infra/mysql/getRecordById.mysql';

export class GetMachineByIdApp {
  async run(id: number) {
    const getMachineByIdService = new GetRecordByIdService<MachinesModel>(
      new GetRecordByIdMySql(),
    );

    return getMachineByIdService.run('Machines', id);
  }
}
