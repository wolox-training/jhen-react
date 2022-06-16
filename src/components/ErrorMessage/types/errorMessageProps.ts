import { ValidationError } from 'types/validationError';

export interface ErrorMessageProps {
  error?: ValidationError | string;
}
