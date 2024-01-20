import React, { forwardRef } from 'react';
import {
  type InputProps,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { type FieldError } from 'react-hook-form';

export type IProps = Omit<InputProps, 'value'> & {
  Label: string;
  error?: FieldError;
  value?: string | number | readonly string[] | null;
};

const InputBase: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (
  { error, Label, value, ...props },
  ref
) => {
  const newValue = value ?? undefined;

  return (
    <FormControl isInvalid={error?.message != null}>
      <FormLabel htmlFor={props.name}>{Label}</FormLabel>
      <Input
        value={newValue}
        focusBorderColor={error != null ? 'red.300' : '#999'}
        isInvalid={error != null}
        bgColor="#fff"
        borderColor="#ddd"
        errorBorderColor="red.300"
        _hover={{ borderColor: '#aaa' }}
        _disabled={{ bgColor: '#e3e3e3' }}
        _readOnly={{ bgColor: '#e3e3e3', cursor: 'not-allowed' }}
        {...props}
        ref={ref}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const TextField = forwardRef(InputBase);
