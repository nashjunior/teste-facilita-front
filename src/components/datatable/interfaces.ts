import { type AxiosRequestConfig } from 'axios';
import { type TableCellProps, type ButtonProps } from '@chakra-ui/react';
import { type IconBaseProps } from 'react-icons';

export type Flatten<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]:
        | `${Prefix & string}${Prefix extends '' ? '' : '.'}${K & string}`
        | Flatten<
            T[K],
            `${Prefix & string}${Prefix extends '' ? '' : '.'}${K & string}`
          >;
    }[keyof T]
  : Prefix;

interface IFlattenWithField<T> {
  field: Flatten<T>;
  text: string;
  highlightRowColor?: (item: T) => string;
  currency?: Intl.NumberFormatOptions;
  date?: string;
  enum?: string;
}

export type IColumn<T> = IFlattenWithField<T> & TableCellProps;

export interface IDatatableContextData<T> {
  dataList: T[];
  updateDatatable: (list: T[]) => void;

  total: number;
  updateTotal: (total: number) => void;

  totalPage: number;
  updateTotalPage: (total: number) => void;

  page: number;
  updatePage: (page: number) => void;

  perPage: number;
  updatePerPage: (perPage: number) => void;

  getValueFormated: (object: T, column: IColumn<T>) => string;
}

export interface IFieldSort {
  field: string;
  sort: 'OFF' | 'ASC' | 'DESC';
}

export interface IFilter {
  component: React.ReactElement;
  field: string | string[];
  value: any;
}

export interface IDatatableOption<T = any> {
  actions?: {
    headerText: string;
    items: Array<{
      icon: React.ReactElement;
      tooltip: string;
      getRow: (row: T) => void;
      handleShowAction?: (row: T) => boolean;
    }>;
  };
  filters?: IFilter[];

  order?: { fields: string[]; orders?: any };
  columnOrder?: { visible: boolean; label: string };
  selectMultiline?: {
    visible: boolean;
    primaryColumn: string;
    stateSelectedRows: any[];
  };
  exportCsv?: {
    label: string;
    filename: string;
    columns: Array<{ field: string; title: string }>;
  };
  widgets?: IWidgetType[];
}

export type IRemoteDatatableOptions<T> = IDatatableOption<T> & {
  serverData: {
    url: string;
    headers?: AxiosRequestConfig['headers'];
    serverPagination?: boolean;
    params?: string;
  };
};

export interface IResponsePaginaton<T> {
  total: number;
  totalPage: number;
  items: T[];
}

export interface IWidgetType {
  tooltip: string;
  component: React.ReactElement<IconBaseProps>;
  action?: () => void;
  colorScheme?: ButtonProps['colorScheme'];
}
