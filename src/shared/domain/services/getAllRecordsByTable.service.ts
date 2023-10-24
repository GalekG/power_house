import { GetAllRecordsByTableRepository } from '../repositories/getAllRecordsByTable.repository';

export class GetAllRecordsByTableService<T> {
  constructor(
    private getAllRecords: GetAllRecordsByTableRepository<T>,
  ) {}

  async run(table: string) {
    return this.getAllRecords.run(table);
  }
}
