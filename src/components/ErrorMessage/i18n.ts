import i18next from 'i18next';

i18next.addResources('es', 'validations', {
  required: 'Este campo es requerido',
  invalid: '',
  invalidType: '',
  email: 'El email es inválido',
  stringMin: 'El campo debe ser de mínimo {{min}} caracteres',
  stringMax: 'El campo debe ser de máximo {{max}} caracteres',
  oneOf: 'El campo {{label}} debe coincidir con el campo {{values}}'
});

i18next.addResources('en', 'validations', {
  required: 'This field is required',
  invalid: '',
  invalidType: '',
  email: 'The email is invalid',
  stringMin: 'The field must be at least {{min}} characters',
  stringMax: 'The field must be a maximum of {{max}} characters',
  oneOf: 'The Field {{label}} must match field {{values}}'
});
