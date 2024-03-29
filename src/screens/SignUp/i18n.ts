import i18next from 'i18next';

i18next.addResources('es', 'SignUp', {
  lblName: 'Nombre',
  lblLastName: 'Apellido',
  lblEmail: 'Email',
  lblPassword: 'Password',
  lblPasswordConfirm: 'Confirmación de Password',
  lblSignUp: 'Sign Up',
  lblLogin: 'Login',
  minPassword: 'La contraseña debe ser de mínimo {{val}} caracteres',
  maxPassword: 'La contraseña debe ser de máximo {{val}} caracteres',
  passNotMatch: 'La confirmación de la contraseña no coincide',
  successMessage: 'Registrado con exito'
});

i18next.addResources('en', 'SignUp', {
  lblName: 'Name',
  lblLastName: 'Last Name',
  lblEmail: 'Email',
  lblPassword: 'Password',
  lblPasswordConfirm: 'Password Confirmation',
  lblSignUp: 'Sign Up',
  lblLogin: 'Login',
  minPassword: 'The password must be at least {{val}} characters',
  maxPassword: 'The password must be of maximum {{val}} characters',
  passNotMatch: 'Password confirmation does not match',
  successMessage: 'Successfully registered'
});
