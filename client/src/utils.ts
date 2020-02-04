export const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce((error: any, validator: any) =>
    error || validator(value), undefined);

export const checkError = (meta: any) => {
  if ((meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
    meta.touched) {
    return true;
  }
  return false;
};

export const required = (value: any) => (value ? undefined : 'Required');

export const phoneNoValidation = (phone: string) => {
  const regexForPhoneNoValidation = /^(?:\+?88)?01[1-9]\d{8}$/;
  if (phone.match(regexForPhoneNoValidation)) {
    return undefined;
  }
  return 'Please enter a 11 digit no e.g. 01711111111';
};