import React, { forwardRef } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  type SelectProps,
} from '@chakra-ui/react';
import { type FieldError } from 'react-hook-form';

export type IProps = SelectProps & {
  items: Array<{ label: string; value: string | number }>;
  Label: string;
  error?: FieldError;
};

const InputBase: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (
  { items, error, Label, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={error?.message != null}>
      <FormLabel htmlFor={props.name}>{Label}</FormLabel>
      <Select
        {...props}
        ref={ref}
        focusBorderColor={error != null ? 'red.300' : '#999'}
        isInvalid={error != null}
        bgColor="#fff"
        borderColor="#ddd"
        errorBorderColor="red.300"
        _hover={{ borderColor: '#aaa' }}
        _disabled={{ bgColor: '#e3e3e3' }}
      >
        <option value="">Selecione uma opção</option>
        {items.map((i) => (
          <option key={i.value.toString()} value={i.value}>
            {i.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const SelectField = forwardRef(InputBase);
