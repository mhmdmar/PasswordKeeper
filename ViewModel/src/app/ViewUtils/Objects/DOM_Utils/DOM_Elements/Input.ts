import {FormButtonItem, FormTextItem} from '../../../Interfaces/Templates/FormTemplate';

export const inputUtils = {
  toggleTypePassword(input: FormTextItem | FormButtonItem) {
    const inputType = input.type;
    input.type = inputType !== 'password' ? 'password' : 'text';
  }
};
