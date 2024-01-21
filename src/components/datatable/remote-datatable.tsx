import { useEffect, useCallback, useTransition, useMemo, useRef } from 'react';
import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  SimpleGrid,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import axios, { type AxiosRequestConfig } from 'axios';
import HeaderColumn from './header';
import ExportCSV from './export-csv';
import { type IResponsePaginaton } from './interfaces';
import { useDatalist, usePagination, useResponse } from './hooks';
import { type IRemoteDataTableProps } from '.';
import BoxPagination from './box-pagination';

// import ExportCSV from '../ExportCSV';

// eslint-disable-next-line react/function-component-definition
export default function RemoteSourceDataTable<T>({
  columns,
  options,
  serverData,
  p,
  padding,
  px,
  py,
  paddingLeft,
  pl,
  paddingRight,
  pr,
  paddingTop,
  pt,
  m,
  margin,
  mx,
  my,
  marginLeft,
  ml,
  marginRight,
  mr,
  marginTop,
  mt,
  marginBottom,
  mb,
  paddingBottom,
  pb,
  ...props
}: Omit<IRemoteDataTableProps<T>, 'data'>): JSX.Element {
  const { page, perPage } = usePagination<T>();
  const { getValueFormated: getValue } = useDatalist<T>();
  const { dataList, updateDatatable, updateTotal, updateTotalPage } =
    useResponse<T>();

  const actions = options.actions?.items ?? [];
  const widgets = options.widgets ?? [];

  const [isPending, startTransition] = useTransition();
  const url = useRef<string | null>(null);

  const { isOpen, onToggle } = useDisclosure();

  const requestParams: AxiosRequestConfig = useMemo(
    () => ({
      params: {
        page:
          serverData.serverPagination != null && serverData.serverPagination
            ? page
            : undefined,
        perPage:
          serverData.serverPagination != null && serverData.serverPagination
            ? perPage
            : undefined,
        ...options.filters?.reduce(
          (obj, { field, value }) =>
            Array.isArray(field)
              ? { ...obj, query: value, query_fields: field }
              : {
                  ...obj,
                  [field]: value,
                },
          {}
        ),
      },
      headers: { ...serverData.headers },
    }),
    [options.filters, serverData, page, perPage]
  );

  const loadItems = useCallback(async (): Promise<void> => {
    const {
      data: { items, total: totalReponse, totalPage: totalPageResponse },
      request,
    } = await axios.get<IResponsePaginaton<T>>(serverData.url, {
      ...requestParams,
    });

    url.current = request?.responseURL;
    updateTotal(totalReponse);
    updateTotalPage(totalPageResponse);
    updateDatatable(items);
  }, [
    requestParams,
    serverData.url,
    updateTotal,
    updateTotalPage,
    updateDatatable,
  ]);

  useEffect(() => {
    startTransition(() => {
      void loadItems();
    });
  }, [loadItems]);

  const hasWdigets = widgets.length > 0 || options.exportCsv;

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 5 }}
        spacing={2}
        gridColumnStart={-1}
        mr={mr ?? 4}
        mt={mt}
        ml={ml}
        pt={pt}
        pr={pr}
        pl={pl}
        p={p}
        padding={padding}
        px={px}
        py={py}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        paddingTop={paddingTop}
        m={m}
        margin={margin}
        mx={mx}
        my={my}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
      >
        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
        {hasWdigets && (
          <FormControl>
            <HStack>
              <FormLabel>
                Actions{' '}
                <Switch onChange={onToggle} size="md" checked={isOpen} />
              </FormLabel>
            </HStack>
            <Collapse in={isOpen}>
              {options.widgets?.map(
                (
                  { tooltip, component: Component, action, colorScheme },
                  index
                ) => (
                  <Tooltip
                    hasArrow
                    label={tooltip}
                    placement="top"
                    mr={2}
                    key={index}
                  >
                    <Button
                      size="md"
                      onClick={action}
                      colorScheme={colorScheme}
                      mr={2}
                    >
                      {Component}
                    </Button>
                  </Tooltip>
                )
              )}

              {options.exportCsv != null && (
                <ExportCSV
                  async
                  serverPagination={serverData?.serverPagination}
                  fileName={options.exportCsv.filename}
                  columns={options.exportCsv.columns}
                  url={url.current as string}
                />
              )}
            </Collapse>
          </FormControl>
        )}

        {options.filters?.map(({ component: Component }) => Component)}
      </SimpleGrid>

      <Flex direction="column" mt={4}>
        <TableContainer>
          <Table {...props}>
            <Thead>
              <Tr>
                {columns.map(({ field, text, ...props }, index) => (
                  <Th key={`column${index}`}>
                    <HeaderColumn
                      field={field as string}
                      text={text}
                      handleFieldSort={(sort) => {
                        console.log('aqui');
                      }}
                      {...props}
                    />
                  </Th>
                ))}

                {actions.length > 0 && (
                  <Th style={{ textAlign: 'center' }}>
                    {options?.actions?.headerText}
                  </Th>
                )}
              </Tr>
            </Thead>

            <Tbody>
              {isPending ? (
                <Tr mt={2}>
                  <Td
                    rowSpan={columns.length}
                    colSpan={
                      columns.length + (options?.actions?.items != null ? 1 : 0)
                    }
                    textAlign="center"
                  >
                    <Spinner size="xl" />
                  </Td>
                </Tr>
              ) : (
                dataList.map((row, indexRow) => (
                  <Tr key={`row${indexRow}`}>
                    {columns.map((column) => {
                      const value = getValue(row, column);
                      const { field, ...props } = column;
                      return (
                        <Td key={field as string} {...props}>
                          {value}
                        </Td>
                      );
                    })}

                    {actions.length > 0 && (
                      <Td
                        textAlign="center"
                        color="#898c90"
                        _hover={{ color: 'teal.300' }}
                        borderLeft="1px solid #B2F5EA"
                      >
                        {actions.map(
                          (action, index) =>
                            ((action.handleShowAction != null &&
                              !!action.handleShowAction(row)) ||
                              action.handleShowAction == null) && (
                              <Button
                                bg="none"
                                type="button"
                                onClick={() => {
                                  action.getRow(row);
                                }}
                                key={`action${index}`}
                              >
                                <Tooltip
                                  hasArrow
                                  label={action.tooltip}
                                  placement="left"
                                >
                                  <span>{action.icon}</span>
                                </Tooltip>
                              </Button>
                            )
                        )}
                      </Td>
                    )}
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <BoxPagination
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          marginBottom={marginBottom}
          paddingBottom={paddingBottom}
          marginLeft={marginLeft}
          marginRight={marginRight}
          mb={mb}
          mr={mr}
          ml={ml}
          pb={pb}
          pr={pr}
          pl={pl}
        />
      </Flex>
    </>
  );
}
