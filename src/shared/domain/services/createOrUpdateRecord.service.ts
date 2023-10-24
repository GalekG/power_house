import { CreateOrUpdateRecordRepository } from '../repositories/createOrUpdateRecord.repository';

export class CreateOrUpdateRecordService<T> {
  constructor(
    private createOrUpdateRecord: CreateOrUpdateRecordRepository,
  ) {}

  async run(data: T, table: string, id?: number) {
    return this.createOrUpdateRecord.run(data, table, id);
  }
}
