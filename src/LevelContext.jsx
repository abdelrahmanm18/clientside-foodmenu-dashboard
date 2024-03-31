import { createContext } from 'react';

export const Context = createContext({
  title: '',
  description: '',
  price: '',
  image_url: null,
  categoryID: 0,
  subCategoryID: 0,
});
