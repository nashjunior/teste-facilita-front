import { Flex, FormLabel } from '@chakra-ui/react';
import React from 'react';

interface IFormGroupProps {
  name?: string;
  cols?: [number, number, number];
  children?: React.ReactNode;
}

const FormGroup: React.FC<IFormGroupProps> = ({ name, children }) => {
  return (
    <Flex direction="column" alignItems="flex-start" padding="4px 8px">
      <FormLabel
        htmlFor={name}
        fontSize="14px"
        fontWeight="700"
        marginBottom="4px"
      >
        {name}
      </FormLabel>
      {children}
    </Flex>
  );
};

export default FormGroup;
