import api from 'config/api';

import { ServiceResponse } from './types/serviceResponse';
import { BooksResponse } from './types/BooksResponse';

const bookPath = '/books';

export function getBooks() {
  return api.get<ServiceResponse<BooksResponse>>(bookPath)
    .then(res => {
      if (res.ok) {
        return res.data;
      }

      throw res.data;
    });
}
