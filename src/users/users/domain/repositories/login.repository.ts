export interface LoginRepository {
  run(username: string, password: string): Promise<Boolean>;
}
