import { useContextSelector } from 'use-context-selector';
import { DatatableContextData } from '../context';

import { type IDatatableContextData } from '../interfaces';

export const useResponse = <T>(): Pick<
  IDatatableContextData<T>,
  'dataList' | 'updateDatatable' | 'updateTotal' | 'updateTotalPage'
> => {
  const dataList = useContextSelector(
    DatatableContextData,
    ({ dataList: page1 }) => {
      return page1;
    }
  );
  const updateTotal = useContextSelector(
    DatatableContextData,
    ({ updateTotal: updatePage1 }) => updatePage1
  );
  const updateTotalPage = useContextSelector(
    DatatableContextData,
    ({ updateTotalPage: perPage1 }) => perPage1
  );
  const updateDatatable = useContextSelector(
    DatatableContextData,
    ({ updateDatatable: updatePerPage1 }) => updatePerPage1
  );

  return {
    dataList,
    updateTotal,
    updateTotalPage,
    updateDatatable,
  };
};
