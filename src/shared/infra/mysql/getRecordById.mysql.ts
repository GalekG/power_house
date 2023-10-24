import { GetRecordByIdRepository } from '../../domain/repositories/getRecordById';
import { findOne } from './db.mysql';

export class GetRecordByIdMySql<T> implements GetRecordByIdRepository<T> {
  async run(table: string, id: number): Promise<T> {
    return findOne(table, id);
  }
}
