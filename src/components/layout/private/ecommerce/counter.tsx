import React, { useState, useEffect } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

interface ICounterProps {
  start?: number;
  end: number;
  duration?: number;
}

export const AnimatedCounter: React.FC<ICounterProps> = ({
  start = 0,
  end,
  duration = 2000,
}) => {
  const [currentCount, setCurrentCount] = useState(start);

  useEffect(() => {
    const incrementCount = (): void => {
      const tick = Math.ceil(duration / (end - start));
      if (currentCount < end) {
        setCurrentCount((prevCount) => prevCount + 1);
        setTimeout(incrementCount, tick);
      }
    };
    incrementCount();
  }, [start, end, duration, currentCount]);

  return (
    <Box>
      <Heading>{currentCount}</Heading>
      <Text fontSize="sm">sd</Text>
    </Box>
  );
};
