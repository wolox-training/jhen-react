export interface User {
  email: string;
  firstName: string;
  lastName: string;
  pasword: string;
  passwordConfirmation: string;
  [key: string]: any;
}
