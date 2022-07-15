interface Errors {
  [key: string]: Array<string>;
  full_messages: Array<string>;
}

export interface ServiceResponse<T> {
  data: T;
  errors: Errors;
}
