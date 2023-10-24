import { ValidateDataRepository } from '../repositories/validateData.repository';

export class ValidateDataService<DataModel> {
  constructor(
    private validation: ValidateDataRepository,
  ) {
  }

  run(data: DataModel): void {
    return this.validation.run(data);
  }
}
