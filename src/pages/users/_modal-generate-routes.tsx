import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Box,
  type ModalProps,
} from '@chakra-ui/react';
import React from 'react';
import { type IUser } from '../../definitions';
import { apiBase } from '../../config/api-base';
import { FaTimes } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { t } from 'i18next';

type IProps = Omit<ModalProps, 'children'>;

export const ModalGenerateRoutes: React.FC<IProps> = ({
  isOpen,
  onClose,
  ...rest
}) => {
  const [clientsRoutes, setClientsRoutes] = React.useState<IUser[]>([]);

  const handleCloseModal = (): void => {
    onClose();
  };

  React.useEffect(() => {
    const loadRoutes = async (): Promise<void> => {
      const { data } = await apiBase.get<IUser[]>('routes/generate');
      setClientsRoutes(data);
    };

    if (isOpen) void loadRoutes();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modalTitleGenerateRoute')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody alignSelf="center">
          {clientsRoutes.map((client, index) => (
            <Flex key={client.id} direction="column" mb={4} w="max-content">
              <Flex align="center">
                <Box position="relative">
                  <Box
                    width="30px"
                    height="30px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="telegram.500"
                    color="white"
                    borderRadius="full"
                    zIndex="docked"
                  >
                    <TbTruckDelivery />
                  </Box>
                  <Box
                    ml={8}
                    position="absolute"
                    left="100%"
                    top="50%"
                    transform="translateY(-50%)"
                    maxWidth="calc(100vw - 96px)" // Ajuste a largura máxima conforme necessário
                  >
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      overflowWrap="break-word"
                    >
                      {client.name}
                    </Text>
                  </Box>
                </Box>
              </Flex>
              {index < clientsRoutes.length - 1 && (
                <Box width="2px" height="20px" mt={2} ml={4} bg="gray.400" />
              )}
            </Flex>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleCloseModal}
            leftIcon={<FaTimes />}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
