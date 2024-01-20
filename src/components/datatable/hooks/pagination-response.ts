import { useContextSelector } from 'use-context-selector';
import { DatatableContextData } from '../context';
import { type IDatatableContextData } from '../interfaces';

export const usePaginationResponse = <T extends Record<string, any>>(): Pick<
  IDatatableContextData<T>,
  'totalPage' | 'total'
> => {
  const total = useContextSelector(
    DatatableContextData,
    ({ total: page1 }) => page1
  );

  const totalPage = useContextSelector(
    DatatableContextData,
    ({ totalPage: perPage1 }) => perPage1
  );

  return { total, totalPage };
};
