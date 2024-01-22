import React from 'react';
import { Button, Flex, useMediaQuery } from '@chakra-ui/react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { usePagination, usePaginationResponse } from './hooks';

interface IPaginatorProps {
  handleChangePage: (page: number) => void;
}

const Paginator: React.FC<IPaginatorProps> = ({ handleChangePage }) => {
  const { updatePage, page } = usePagination();
  const { totalPage, total } = usePaginationResponse();

  const [isDesktop] = useMediaQuery('(min-width: 960px)');

  const createButtonsPagination = React.useCallback((): JSX.Element[] => {
    const buttons = [];
    if (page > 3) {
      buttons.push(
        <Button
          key="initial"
          type="button"
          borderLeft="none"
          borderRight="none"
          minW={4}
          onClick={() => {
            handleChangePage(1);
          }}
        >
          <FiChevronsLeft size={15} />
        </Button>
      );
    }

    for (let i = 1; i <= totalPage; i += 1) {
      if (i >= page - 2 && i <= page + 2) {
        buttons.push(
          <Button
            borderLeft="none"
            borderRight="none"
            minW={10}
            key={i}
            bg="none"
            type="button"
            _active={{ bg: '#ccc' }}
            onClick={() => {
              handleChangePage(i);
            }}
          >
            {i}
          </Button>
        );
      }
    }
    if (page < totalPage - 3) {
      buttons.push(
        <Button
          key="final"
          type="button"
          borderLeft="none"
          borderRight="none"
          _active={{ bg: '#ccc' }}
          onClick={() => {
            handleChangePage(totalPage);
          }}
        >
          <FiChevronsRight size={15} />
        </Button>
      );
    }

    return buttons;
  }, [page, totalPage, handleChangePage]);

  return (
    <Flex direction="row" wrap="nowrap" ml={2} gap={2}>
      <Button
        alignSelf="center"
        justifyContent="center"
        type="button"
        onClick={() => {
          if (page >= 2) updatePage(page - 1);
        }}
        leftIcon={isDesktop ? <IoIosArrowBack /> : undefined}
        isDisabled={totalPage < total}
        fontSize="sm"
        disabled
      >
        {isDesktop ? 'Previous' : <IoIosArrowBack />}
      </Button>

      {createButtonsPagination()}

      <Button
        type="button"
        rightIcon={isDesktop ? <IoIosArrowForward /> : undefined}
        onClick={() => {
          if (page < totalPage) updatePage(page + 1);
        }}
        fontSize="sm"
        isDisabled={totalPage < total}
      >
        {!isDesktop ? <IoIosArrowForward /> : 'Next'}
      </Button>
    </Flex>
  );
};

export default Paginator;
