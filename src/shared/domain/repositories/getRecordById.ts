export interface GetRecordByIdRepository<T> {
  run(table: string, id: number): Promise<T>
}
