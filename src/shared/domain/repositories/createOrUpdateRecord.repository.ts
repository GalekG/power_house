export interface CreateOrUpdateRecordRepository {
  run(data: any, table: string, id?: number): Promise<number>;
}
