import { GetRecordByIdRepository } from '../repositories/getRecordById';

export class GetRecordByIdService<T> {
  constructor(
    private getRecordById: GetRecordByIdRepository<T>,
  ) {}

  async run(table: string, id: number) {
    return this.getRecordById.run(table, id);
  }
}
