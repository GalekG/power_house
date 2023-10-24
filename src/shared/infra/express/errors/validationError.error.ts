const DEFAULT_MESSAGE_VALIDATION = 'core.messages.validationErrors';
const DEFAULT_PATH_VALIDATOR = 'form';

export class ValidationError extends Error {
  statusCode: number;

  errors: any;

  constructor(errors: any, module = '') {
    super(DEFAULT_MESSAGE_VALIDATION);

    if (module) {
      module += '.';
    }

    const validationErrors = {};

    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const errorString = JSON.stringify(errors[key]);
        const errorKey = `${module}${DEFAULT_PATH_VALIDATOR}.${key}`;
        validationErrors[errorKey] = errorString.indexOf('after:') !== -1
          ? errorString.replace('after:', `after:${module}${DEFAULT_PATH_VALIDATOR}.`)
          : errors[key];
      }
    }

    this.statusCode = 400;
    this.errors = validationErrors;
  }
}
