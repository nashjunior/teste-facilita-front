import { createContext } from 'use-context-selector';
import { type IDatatableContextData } from './interfaces';

export const DatatableContextData = createContext(
  // @ts-expect-error sdd
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as IDatatableContextData<T>
);
