import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../../components/form/textfield';
import { SelectField } from '../../components/form/select';
import { t } from 'i18next';
import { Heading, Stack } from '@chakra-ui/react';
import { type ICreateUser } from '../../definitions';

const FormClient: React.FC = () => {
  const { control } = useFormContext<ICreateUser>();

  return (
    <React.Fragment>
      <Heading size="md">{t('clientInfo')}</Heading>
      {/* <Text>{t('mandatoryInfo')}</Text> */}

      <Stack mt={4} mb={4} direction={['column', 'row']} spacing={[4, 2]}>
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
      </Stack>

      <Stack mb={4} direction={['column', 'row']} spacing={[4, 2]}>
        <Controller
          control={control}
          name="cpf"
          render={({ field, fieldState: { error } }) => (
            <TextField Label={t('cpf')} {...field} error={error} />
          )}
        />
      </Stack>

      <Stack mb={4} direction={['column', 'row']} spacing={[4, 2]}>
        <Controller
          control={control}
          name="address"
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              Label={t('address')}
              {...field}
              error={error}

              // isDisabled={foundedAddressCompany}
            />
          )}
        />
      </Stack>
      <Stack mb={4} direction={['column', 'row']} spacing={[4, 2]}>
        <Controller
          control={control}
          name="number"
          render={({ field, fieldState: { error } }) => (
            <TextField Label={t('number')} {...field} error={error} />
          )}
        />
      </Stack>

      <Stack direction={['column', 'row']} spacing={[4, 2]}>
        <Controller
          control={control}
          name="city"
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <SelectField
              Label="Município"
              {...field}
              items={[{ label: 'CE', value: 'CE' }]}
              error={error}
            />
          )}
        />
      </Stack>
    </React.Fragment>
  );
};

export default FormClient;
