import { useContextSelector } from 'use-context-selector';
import { DatatableContextData } from '../context';

import { type IDatatableContextData } from '../interfaces';

export const usePagination = <T>(): Pick<
  IDatatableContextData<T>,
  'page' | 'perPage' | 'updatePage' | 'updatePerPage'
> => {
  const page = useContextSelector(
    DatatableContextData,
    ({ page: page1 }) => page1
  );
  const updatePage = useContextSelector(
    DatatableContextData,
    ({ updatePage: updatePage1 }) => updatePage1
  );
  const perPage = useContextSelector(
    DatatableContextData,
    ({ perPage: perPage1 }) => perPage1
  );
  const updatePerPage = useContextSelector(
    DatatableContextData,
    ({ updatePerPage: updatePerPage1 }) => updatePerPage1
  );

  return {
    page,
    perPage,
    updatePage,
    updatePerPage,
  };
};

export const useDatalist = <T>(): Pick<
  IDatatableContextData<T>,
  'dataList' | 'getValueFormated'
> => {
  const dataList = useContextSelector(
    DatatableContextData,
    ({ dataList }) => dataList
  );
  const getValueFormated = useContextSelector(
    DatatableContextData,
    ({ getValueFormated }) => getValueFormated
  );

  return { dataList, getValueFormated: getValueFormated as any };
};
