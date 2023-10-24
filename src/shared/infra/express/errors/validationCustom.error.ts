import { ValidationError } from './validationError.error';

export class ValidationCustom {
  errors: any;

  constructor(errors: any, module: string = '') {
    const formattedErrors = {};
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const rules = errors[key].toString();
        const messages = [];
        switch (rules) {
          case 'exists':
            messages.push(`The ${key} field exists`);
            break;
          case 'unique':
            messages.push(`The ${key} field is already in use`);
            break;
          default:
            messages.push(rules);
        }
        formattedErrors[key] = messages;
      }
    }

    throw new ValidationError(formattedErrors, module);
  }
}
