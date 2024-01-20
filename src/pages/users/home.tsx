import { Heading } from '@chakra-ui/react';
import React from 'react';
import DataTable from '../../components/datatable';
import { t } from 'i18next';
import {
  type IColumn,
  type IRemoteDatatableOptions,
  type IDatatableOption,
} from '../../components/datatable/interfaces';
import { type ICustomer } from '../../definitions';
import { apiBase } from '../../config/api-base';
import { FaPencil } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';

const Customers: React.FC = () => {
  const columns: Array<IColumn<ICustomer>> = [
    { field: 'name', text: t('name') },
    { field: 'email', text: 'Email' },
    { field: 'cpf', text: t('cpf') },
  ];

  const serverData: IRemoteDatatableOptions<ICustomer>['serverData'] = {
    url: `${apiBase.defaults.baseURL}/customers`,
    serverPagination: true,
  };

  const options: IDatatableOption<ICustomer> = {
    actions: {
      headerText: t('name'),
      items: [
        {
          icon: <FaPencil />,
          tooltip: t('edit'),
          getRow: (row) => {
            console.log(row);
          },
        },
        {
          icon: <FaTrash />,
          tooltip: t('delete'),
          getRow: (row) => {
            console.log(row);
          },
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <Heading mt={8}>{t('customerList')}</Heading>
      <DataTable
        columns={columns}
        options={options}
        serverData={serverData}
        bg="white"
        borderRadius={8}
        mt={4}
        mb={12}
      />
    </React.Fragment>
  );
};

export default Customers;
