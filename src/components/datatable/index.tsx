import React from 'react';
import { DatatableContextData } from './context';
import {
  type IDatatableContextData,
  type IColumn,
  type IDatatableOption,
  type IRemoteDatatableOptions,
} from './interfaces';
import LocalSourceDataTable from './local-datatable';
import RemoteSourceDataTable from './remote-datatable';
import { type TableProps } from '@chakra-ui/react';
import Get from 'lodash/get';
import { format, parseISO } from 'date-fns';

export type IRemoteDataTableProps<T> = {
  serverData: IRemoteDatatableOptions<T>['serverData'];
  data?: never;
  columns: Array<IColumn<T>>;
  options: IDatatableOption<T>;
} & TableProps;

export type IDataTablePropsWithData<T> = {
  data: T[];
  serverData?: never;
  columns: Array<IColumn<T>>;
  options: IDatatableOption<T>;
} & TableProps;

// Utilize uma união de tipos condicional
export type IDataTableProps<T> =
  | IRemoteDataTableProps<T>
  | IDataTablePropsWithData<T>;

// eslint-disable-next-line react/function-component-definition
export default function DataTable<T>({
  columns,
  options,
  serverData,
  data,
  ...props
}: IDataTableProps<T>): JSX.Element {
  const [dataList, setDataList] = React.useState<T[]>(
    serverData != null ? [] : data
  );
  const [total, setTotal] = React.useState(
    serverData != null ? 0 : data.length
  );
  const [totalPage, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const updateDatatable = React.useCallback((list: T[]) => {
    setDataList(list);
  }, []);

  const updateTotal = React.useCallback((newTotal: number) => {
    setTotal(newTotal);
  }, []);

  const updateTotalPage = React.useCallback((newTotal: number) => {
    setTotalPage(newTotal);
  }, []);

  const updatePage = React.useCallback((newTotal: number) => {
    setCurrentPage(newTotal);
  }, []);

  const updatePerPage = React.useCallback((newTotal: number) => {
    setPerPage(newTotal);
  }, []);

  const getValue = React.useCallback((row: T, column: IColumn<T>): string => {
    const value = Get(row, column.field as string);

    if (!('date' in column || 'enum' in column || 'currency' in column))
      return value as string;

    if (column.enum != null) return column.enum[value].toString();

    if (column.date != null)
      try {
        return Array.isArray(value)
          ? // @ts-expect-error should create a date with an array of numbers
            format(new Date(...value), column.date)
          : format(parseISO(value), column.date);
      } catch (error) {
        return value.toString() as string;
      }

    return new Intl.NumberFormat('pt-BR', column.currency).format(
      !Number.isNaN(Number(String(value))) ? value : 0
    );
  }, []);

  const memoDatatable = React.useMemo(
    () => ({
      dataList,
      updateDatatable,
      total,
      updateTotal,
      totalPage,
      updateTotalPage,
      page: currentPage,
      perPage,
      updatePage,
      updatePerPage,
      getValueFormated: getValue,
    }),
    [
      dataList,
      updateDatatable,
      total,
      updateTotal,
      totalPage,
      updateTotalPage,
      currentPage,
      perPage,
      updatePage,
      updatePerPage,
      getValue,
    ]
  );

  return (
    <DatatableContextData.Provider
      value={memoDatatable as IDatatableContextData<T>}
    >
      {serverData != null ? (
        <RemoteSourceDataTable
          columns={columns}
          serverData={serverData}
          options={{ ...options }}
          {...props}
        />
      ) : (
        <LocalSourceDataTable columns={columns} options={options} {...props} />
      )}
    </DatatableContextData.Provider>
  );
}
