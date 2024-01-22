import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../../components/form/textfield';
import { t } from 'i18next';
import { Heading, VStack } from '@chakra-ui/react';
import { type ICreateUser } from '../../definitions';
import { PhoneInputField } from '../../components/form/phoneinput';

const FormClient: React.FC = () => {
  const { control } = useFormContext<ICreateUser>();

  return (
    <React.Fragment>
      <Heading size="md">{t('clientInfo')}</Heading>
      {/* <Text>{t('mandatoryInfo')}</Text> */}

      <VStack mt={4} mb={4} spacing={[4, 2]}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField Label={t('name')} {...field} error={error} />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField Label={t('email')} {...field} error={error} />
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <PhoneInputField Label="Phone" {...field} error={error} />
          )}
        />
      </VStack>
    </React.Fragment>
  );
};

export default FormClient;
