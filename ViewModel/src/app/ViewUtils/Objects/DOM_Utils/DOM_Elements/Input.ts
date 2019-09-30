export const inputUtils = {
  toggleTypePassword(input: any) {
    const inputType = input.type;
    input.type = inputType !== 'password' ? 'password' : 'text';
  }
};

export const inputTypes = {
  Textarea: 'TEXTAREA',
  Input: 'INPUT',
  Select: 'SELECT'
};
