import React, { forwardRef } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  type SwitchProps,
  Switch as SwitchChakra,
} from '@chakra-ui/react';
import { type FieldError } from 'react-hook-form';

export type IProps = SwitchProps & { label: string; error?: FieldError };

const InputBase: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  { error, label, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={error?.message != null}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <SwitchChakra {...props} ref={ref}></SwitchChakra>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const SwitchField = forwardRef(InputBase);
