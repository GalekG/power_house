export interface GetAllRecordsByTableRepository<T> {
  run(table: string): Promise<T[]>
}
