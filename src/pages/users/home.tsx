import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import DataTable from '../../components/datatable';
import { t } from 'i18next';
import {
  type IRemoteDatatableOptions,
  type IColumn,
  type IDatatableOption,
} from '../../components/datatable/interfaces';
import { FaPencil } from 'react-icons/fa6';
import { FaRoute, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { type ICreateUser, type IUser } from '../../definitions';
import FormClient from './form-client';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../validations';
import { createCoordinateSchema } from '../../validations/create-coordinate';
import { type ICreateCoordinate } from '../../definitions/coordinate';
import { FormCoordinate } from './form-coordinate';
import { apiBase } from '../../config/api-base';
import { TextField } from '../../components/form/textfield';
import { useDispatch } from 'react-redux';
import { deleteClient, updateClient } from '../../actions';

type IFormUpdateUser = ICreateUser & ICreateCoordinate;

const Customers: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const modalEditClient = useDisclosure();
  const modalGenerateRoutes = useDisclosure();
  const [queryValue, setQueryValue] = React.useState<string>();
  const dialogDeleteUser = useDisclosure();
  const refUser = React.useRef<IUser | null>(null);
  const cancelRef = React.useRef<HTMLDialogElement | null>(null);
  const refClientsRoutes = React.useRef<IUser[]>();

  const methods = useForm<IFormUpdateUser>({
    resolver: yupResolver<any>(createUserSchema.concat(createCoordinateSchema)),
    defaultValues: { phoneNumber: '', email: '', name: '', coordinates: [] },
  });

  const columns: Array<IColumn<IUser>> = [
    { field: 'name', text: t('name') },
    { field: 'email', text: 'Email' },
    { field: 'phoneNumber', text: t('phoneNumber') },
  ];

  const selectedClientId = React.useRef<string | null>(null);

  const handleGetRoutes = async (): Promise<void> => {
    const { data } = await apiBase.get<IUser[]>('routes/generate');

    refClientsRoutes.current = data;
  };

  const handleCloseModalGenerateRoutes = (): void => {
    refClientsRoutes.current = [];
    modalGenerateRoutes.onClose();
  };

  const handleUpdateClient: SubmitHandler<IFormUpdateUser> = async (
    data
  ): Promise<void> => {
    try {
      await dispatch(
        updateClient({ id: selectedClientId.current as string, ...data }) as any
      );
      methods.reset({ coordinates: [] });
      toast({
        title: t('toastSucessCreateClientTitle'),
        description: t('toastSucessCreateClientDescription'),
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Could not update user!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const serverData: IRemoteDatatableOptions<IUser>['serverData'] = {
    url: `${apiBase.defaults.baseURL}/clients`,
    serverPagination: true,
  };

  const options: IDatatableOption<IUser> = {
    filters: [
      {
        component: (
          <TextField
            Label="pesquisar"
            onChange={(e) => {
              setQueryValue(e.target.value === '' ? undefined : e.target.value);
            }}
            value={queryValue}
          />
        ),
        field: 'query',
        value: queryValue,
      },
      {
        component: <></>,
        field: 'query_fields',
        value: 'c.name,c.email,c.phone_number',
      },
    ],
    actions: {
      headerText: t('actions'),
      items: [
        {
          icon: <FaPencil />,
          tooltip: t('edit'),
          getRow: (row) => {
            selectedClientId.current = row.id;
            methods.setValue('email', row.email);
            methods.setValue('name', row.name);
            methods.setValue('phoneNumber', row.phoneNumber);
            modalEditClient.onOpen();
          },
        },
        {
          icon: <FaTrash />,
          tooltip: t('delete'),
          getRow: (row) => {
            refUser.current = row;

            dialogDeleteUser.onOpen();
          },
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <Heading mt={8} mb={4}>
        {t('userList')}
      </Heading>
      <Button
        leftIcon={<FaRoute />}
        colorScheme="telegram"
        onClick={() => {
          void handleGetRoutes();
          modalGenerateRoutes.onOpen();
        }}
      >
        Generate routes
      </Button>
      <DataTable
        columns={columns}
        options={options}
        serverData={serverData}
        bg="white"
        borderRadius={8}
        mt={4}
        mb={12}
      />

      <Modal
        isOpen={modalGenerateRoutes.isOpen}
        onClose={handleCloseModalGenerateRoutes}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Route order</ModalHeader>
          <ModalCloseButton />

          <ModalBody>asdfasf</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCloseModalGenerateRoutes}
              leftIcon={<FaTimes />}
            >
              Close
            </Button>
            <Button colorScheme="green" leftIcon={<FaSave />} type="submit">
              {t('save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={modalEditClient.isOpen} onClose={modalEditClient.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit client</ModalHeader>
          <ModalCloseButton />
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void methods.handleSubmit(handleUpdateClient)();
              }}
            >
              <ModalBody>
                <FormClient />
                <FormCoordinate />
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={modalEditClient.onClose}
                  leftIcon={<FaTimes />}
                >
                  Close
                </Button>
                <Button colorScheme="green" leftIcon={<FaSave />} type="submit">
                  {t('save')}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={dialogDeleteUser.onClose}
        isOpen={dialogDeleteUser.isOpen}
        isCentered
        size="md"
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('dialogHeaderDeleteClient')}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{t('dialogBodyDeleteClient')}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="blue"
              ml={3}
              onClick={dialogDeleteUser.onClose}
              leftIcon={<FaTimes />}
            >
              {t('close')}
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<FaTrash />}
              ml={3}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                await dispatch(
                  deleteClient(refUser.current?.id as string) as any
                );
              }}
            >
              {t('delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default Customers;
