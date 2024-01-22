/* eslint-disable @typescript-eslint/no-unused-vars */
/* @ts-expect-error will be used later */

import { Button, type ButtonProps, Flex } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

enum Sorts {
  OFF = 'OFF',
  ASC = 'ASC',
  DESC = 'DESC',
}

interface IFieldSort {
  field: string;
  sort: Sorts;
}

interface IHeaderColumnProps {
  field: string;
  text: string;
  handleFieldSort: (field: IFieldSort) => void;
  defaultSort?: Sorts;
}
const next: Record<Sorts, Sorts> = {
  [Sorts.ASC]: Sorts.DESC,
  [Sorts.DESC]: Sorts.OFF,
  [Sorts.OFF]: Sorts.ASC,
};

const HeaderColumn: React.FC<IHeaderColumnProps> = ({
  field,
  text,
  handleFieldSort,
  defaultSort = Sorts.OFF,
}) => {
  const [sort, setSort] = useState<Sorts>(
    defaultSort === Sorts.OFF ? Sorts.ASC : defaultSort
  );
  const [isActive, setIsActive] = useState(defaultSort !== Sorts.OFF);

  const handleClickSort = useCallback(() => {
    const newSort = next[sort];

    setSort(newSort);
    handleFieldSort({ field, sort: newSort });
    setIsActive(newSort !== 'OFF');
  }, [sort, handleFieldSort, field]);

  /* @ts-expect-error will be used later */
  const buttonProps: ButtonProps = {
    size: 'sm',
    type: 'button',
    onClick: handleClickSort,
    colorScheme: isActive ? 'green' : undefined,
  };

  /* @ts-expect-error will be used later */
  const Icon =
    sort === Sorts.OFF || sort === Sorts.ASC
      ? FaSortAmountUp
      : FaSortAmountDown;

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={6}
    >
      {text}

      {/* <Button {...buttonProps}>
        <Icon />
      </Button> */}
    </Flex>
  );
};

export default HeaderColumn;
