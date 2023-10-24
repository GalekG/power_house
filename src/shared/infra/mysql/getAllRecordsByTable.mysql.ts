import { GetAllRecordsByTableRepository } from '../../domain/repositories/getAllRecordsByTable.repository';
import { getAllFromTable } from './db.mysql';

export class GetAllRecordsByTableMySql<T> implements GetAllRecordsByTableRepository<T> {
  async run(table: string): Promise<T[]> {
    return getAllFromTable<T>(table);
  }
}
