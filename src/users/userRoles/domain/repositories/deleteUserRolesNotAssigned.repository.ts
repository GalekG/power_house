export interface DeleteUserRolesNotAssignedRepository {
  run(userId: number, rolesIds?: number[])
}
