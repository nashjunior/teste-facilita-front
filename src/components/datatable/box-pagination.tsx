import { Box, Flex, type FlexProps } from '@chakra-ui/react';
import Select from './select';
import { usePagination, usePaginationResponse, useResponse } from './hooks';
import Paginator from './paginator';
import { t } from 'i18next';

const perPageItems = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
];

const BoxPagination: React.FC<FlexProps> = (props) => {
  const { page, perPage, updatePage, updatePerPage } = usePagination();
  const { total } = usePaginationResponse();
  const { dataList } = useResponse();

  const handleChangePerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    updatePerPage(Number(event.currentTarget.value));
    updatePage(1);
  };

  const handleChangePage = (selectedPage: number): void => {
    updatePage(selectedPage);
  };
  const handleMessageDatalist = (): string => {
    if (dataList.length === 0) return 'Nenhum registro encontrado';

    let message = `${t('datatableShowPagination')} ${
      perPage * page - perPage + 1
    }`;

    const totalRegistro = dataList.length + perPage * (page - 1);

    message = message
      .concat(` - ${totalRegistro} / ${total} `)
      .concat(t('datatableShowRegister'));

    if (total > 1) message = message.concat('s');

    return message;
  };
  return (
    <Flex
      direction="row"
      mt={4}
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      <Box>{handleMessageDatalist()}</Box>

      {dataList.length >= 1 && (
        <>
          <Flex direction="row" alignItems="center" w={220} mt={4}>
            <Flex w={32}>
              <Select
                optionsSelect={perPageItems}
                onChange={handleChangePerPage}
              />
            </Flex>
            <Box w={180} ml={8} fontSize={16}>
              <span>{t('datatablePerPage')}</span>
            </Box>
          </Flex>

          <Paginator handleChangePage={handleChangePage} />
        </>
      )}
    </Flex>
  );
};

export default BoxPagination;
