import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <HStack justifyContent="space-between">
      <Box mt={2}>Logo</Box>
      <Box mt={2} mr={4}>
        {' '}
        algo
      </Box>
    </HStack>
  );
};
