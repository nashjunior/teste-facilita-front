import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  type NumberInputProps,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { type FieldError } from 'react-hook-form';

type IProps = NumberInputProps & { label: string; error?: FieldError };

const InputBase: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (
  { error, label, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={error?.message != null}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <NumberInput {...props} ref={ref} errorBorderColor="red.300">
        <NumberInputField bgColor="#fff" borderColor="#ddd" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const NumberField = forwardRef(InputBase);
