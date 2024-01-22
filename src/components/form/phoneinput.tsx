import React, { forwardRef } from 'react';
// import PhoneInput, { type PhoneInputProps } from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  type Props,
  type DefaultInputComponentProps,
  type State,
} from 'react-phone-number-input';
import { type E164Number } from 'libphonenumber-js/types.cjs';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  type InputProps,
} from '@chakra-ui/react';
import { type FieldError } from 'react-hook-form';

// export const PhoneInputField: React.FC<Props> = (props) => {
//   return <PhoneInput {...props} />;
// };

type IProps = DefaultInputComponentProps &
  Omit<InputProps, 'value' | 'onChange'> & {
    onChange: (value?: E164Number | undefined) => void;
    Label: string;
    error?: FieldError;
  };

const InputBase: React.ForwardRefRenderFunction<
  React.Component<
    Props<DefaultInputComponentProps>,
    State<Props<DefaultInputComponentProps>>,
    any
  >,
  IProps
> = ({ error, Label, ...props }, ref) => {
  return (
    <FormControl isInvalid={error?.message != null}>
      <FormLabel>{Label}</FormLabel>
      <PhoneInput
        defaultCountry="BR"
        {...props}
        ref={ref}
        inputComponent={Input}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const PhoneInputField = forwardRef(InputBase);
