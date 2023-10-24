import { MachinesModel } from '../../shared/domain/models/machines.model';
import { GetAllRecordsByTableService } from '../../shared/domain/services/getAllRecordsByTable.service';
import { GetAllRecordsByTableMySql } from '../../shared/infra/mysql/getAllRecordsByTable.mysql';

export class GetAllMachinesApp {
  async run() {
    const getAllMachinesService = new GetAllRecordsByTableService<MachinesModel>(
      new GetAllRecordsByTableMySql(),
    );

    return getAllMachinesService.run('Machines');
  }
}
