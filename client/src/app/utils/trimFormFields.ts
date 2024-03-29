export default function trimFormFields(formFields: { [key: string]: string }) {
  const trimmedForm: any = {};

  for (const key in formFields) {
    if (formFields.hasOwnProperty(key)) {
      const value = formFields[key];
      if (typeof value === 'string') {
        trimmedForm[key] = value.trim();
      } else {
        trimmedForm[key] = value;
      }
    }
  }

  return trimmedForm;
}
