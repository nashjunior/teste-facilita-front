import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../validations';
import {
  Button,
  type StackProps,
  VStack,
  useBreakpointValue,
  useToast,
  Center,
} from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import { t } from 'i18next';
import { type ICreateUser } from '../../definitions';
import { selectUserRequestStatus } from '../../selectors';
import { createClient } from '../../actions';

const FormClient = React.lazy(async () => await import('./form-client'));

const NewClient: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm<ICreateUser>({
    resolver: yupResolver<any>(createUserSchema),
    defaultValues: { phoneNumber: '', email: '', name: '' },
  });

  const isLoading = useSelector(selectUserRequestStatus);

  const variant = useBreakpointValue<StackProps>(
    { md: { w: '75%', mt: 8 }, base: { w: '100%' } },
    { ssr: false, fallback: 'base' }
  );

  const handleCreateClient: SubmitHandler<ICreateUser> = async (
    data
  ): Promise<void> => {
    try {
      await dispatch(createClient(data) as any);
      console.log(data);
      toast({
        title: t('toastSucessCreateClientTitle'),
        description: t('toastSucessCreateClientDescription'),
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      navigate('/users');
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Could not create user!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <VStack justifyContent="center" alignItems="center">
        <VStack {...variant} bgColor="white">
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void methods.handleSubmit(handleCreateClient)();
              }}
            >
              <FormClient />

              <Center>
                <Button
                  my={4}
                  rightIcon={<FaSave />}
                  colorScheme="green"
                  type="submit"
                  isLoading={isLoading}
                >
                  {t('save')}
                </Button>
              </Center>
            </form>
          </FormProvider>
        </VStack>
      </VStack>
    </>
  );
};

export default NewClient;
