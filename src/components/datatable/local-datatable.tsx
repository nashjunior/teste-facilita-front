import React from 'react';
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
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
// import ExportCSV from './export-csv';
import HeaderColumn from './header';
import { useDatalist, useResponse } from './hooks';
import { type IDataTablePropsWithData } from '.';
import BoxPagination from './box-pagination';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/function-component-definition
export default function DataTable<T>({
  columns,
  options,
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
  paddingBottom,
  mb,
  pb,
  ...props
}: Omit<IDataTablePropsWithData<T>, 'data'>) {
  const { dataList } = useResponse<T>();
  const { getValueFormated: getValue } = useDatalist<T>();
  const { isOpen, onToggle } = useDisclosure();

  const actions = options.actions?.items ?? [];
  const widgets = options.widgets ?? [];

  const hasWdigets =
    (options.widgets != null && !(options.widgets.length === 0)) ||
    options.exportCsv;

  return (
    <React.Fragment>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 5 }}
        spacing={2}
        gridColumnStart={-1}
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
        mt={mt}
        mr={mr}
        ml={ml}
        pt={pt}
        pr={pr}
        pl={pl}
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
              {widgets.map(
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

              {/* {options.exportCsv != null && (
                <ExportCSV
                  async
                  serverPagination={options?.serverData?.serverPagination}
                  fileName={options.exportCsv.filename}
                  columns={options.exportCsv.columns}
                  url={url.current as string}
                />
              )} */}
            </Collapse>
          </FormControl>
        )}

        {options.filters?.map(({ component: Component }) => Component)}
      </SimpleGrid>

      <Flex
        direction="column"
        gap={4}
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
        mt={mt ?? 4}
        mr={mr}
        ml={ml}
        pt={pt}
        pr={pr}
        pl={pl}
      >
        <TableContainer>
          <Table {...props}>
            <Thead>
              <Tr>
                {columns.map(({ field, text, ...props }, index) => (
                  <Th key={`column${index}`}>
                    <HeaderColumn
                      field={field as string}
                      text={text}
                      handleFieldSort={() => {
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
              {dataList.map((row, indexRow) => (
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
                      _hover={{
                        color: 'teal.300',
                      }}
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
              ))}
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
    </React.Fragment>
  );
}
