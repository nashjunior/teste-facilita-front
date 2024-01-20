import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { type SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../validations';
import {
  Box,
  Button,
  type StackProps,
  VStack,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import { t } from 'i18next';
import { type ICreateUser } from '../../definitions';

const FormClient = React.lazy(async () => await import('./form-client'));

const NewClient: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm<ICreateUser>({
    resolver: yupResolver<any>(createUserSchema),
    defaultValues: {
      // name: '',
      // jobTitle: '',
      // cpf: '',
      // email: '',
      // password: '',
      // confirmPassword: '',
    },
  });

  const variant = useBreakpointValue<StackProps>(
    { md: { w: '75%', mt: 8 }, base: { w: '100%' } },
    { ssr: false, fallback: 'base' }
  );

  const handleCreateClient: SubmitHandler<ICreateUser> = async (
    data
  ): Promise<void> => {
    // void handleCreateData(data);
    console.log(data);
    toast({
      title: 'Sucesso!',
      description: 'Arquivo baixado com sucesso!',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <>
      <VStack justifyContent="center" alignItems="center">
        <VStack {...variant} bgColor="white">
          <FormProvider {...methods}>
            <Box
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                void methods.handleSubmit(handleCreateClient)();
              }}
            >
              <FormClient />

              <Button
                my={4}
                rightIcon={<FaSave />}
                colorScheme="green"
                type="submit"
              >
                {t('save')}
              </Button>
            </Box>
          </FormProvider>
        </VStack>
      </VStack>
    </>
  );
};

export default NewClient;
