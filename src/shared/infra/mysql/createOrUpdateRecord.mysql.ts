import { CreateOrUpdateRecordRepository } from '../../domain/repositories/createOrUpdateRecord.repository';
import { insertRecord, updateRecord } from './db.mysql';

export class CreateOrUpdateRecordMySql<DataModel> implements CreateOrUpdateRecordRepository {
  async run(data: DataModel, table: string, id?: number): Promise<number> {
    let rowId = id;

    if (id) {
      await updateRecord(table, data, id);
    } else {
      rowId = await insertRecord(table, data);
    }

    return rowId;
  }
}
