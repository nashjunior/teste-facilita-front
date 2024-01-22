import React from 'react';
import {
  Button,
  Grid,
  GridItem,
  useBreakpointValue,
  type GridProps,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  type GridItemProps,
  HStack,
  VStack,
} from '@chakra-ui/react';
import Sidebar from '../sidebar';
import { FaList, FaPlus, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa';
import { Header } from './header';
import { Outlet } from 'react-router-dom';
import { t } from 'i18next';

const items = [
  {
    label: 'Clients',
    icon: FaUser,
    items: [
      { label: t('sidebarTitleList'), to: '/users', icon: FaList },
      { label: t('sidebarTitleNew'), to: '/users/new', icon: FaPlus },
    ],
  },
];

const ECommerceLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const variant = useBreakpointValue<GridProps>(
    {
      md: {
        templateAreas: `"header header"
                "nav main"
                "footer footer"`,
        gridTemplateRows: '1fr 12fr 3fr',
        gridTemplateColumns: '250px 1fr',
        gap: 1,
        bg: 'gray.100',
      },

      base: { gridTemplateRows: '1fr 12fr 3fr', gap: 2, maxW: '100vw' },
    },
    { ssr: false, fallback: 'md' }
  );

  const variantHeader = useBreakpointValue<GridItemProps>(
    {
      md: {
        area: 'header',
        borderBottom: '1px solid',
        borderColor: 'gray.200',
        pl: 2,
        mr: 4,
      },

      base: { pl: 2, w: '100%' },
    },
    { ssr: false, fallback: 'md' }
  );

  const variantMain = useBreakpointValue<GridItemProps>(
    { md: { area: 'main' }, base: { bg: 'gray.100' } },
    { ssr: false, fallback: 'md' }
  );

  const variantFooter = useBreakpointValue<GridItemProps>(
    { md: { area: 'footer' }, base: { bg: 'gray.500' } },
    { ssr: false, fallback: 'md' }
  );

  const hasTemplateArea = React.useMemo(
    () => variant?.templateAreas != null,
    [variant]
  );

  React.useEffect(() => {
    if (hasTemplateArea) {
      onClose();
    }
  }, [hasTemplateArea, onClose]);

  return (
    <React.Fragment>
      <Grid {...variant} minH="100vh">
        <GridItem as="section" {...variantHeader}>
          {hasTemplateArea ? (
            <Header />
          ) : (
            <Button onClick={onOpen} zIndex={2}>
              Open
            </Button>
          )}
        </GridItem>
        {hasTemplateArea && (
          <GridItem
            as="nav"
            area={'nav'}
            color="blackAlpha.700"
            fontWeight="bold"
            pl={2}
            display="flex"
            flexDir="column"
            justifyContent="flex-start"
          >
            <VStack>
              <Sidebar items={items} spacing={2} mb={8} />
              <Button
                leftIcon={<FaSignOutAlt />}
                w="100%"
                p={2}
                colorScheme="cyan"
                onClick={() => {
                  console.log('signout');
                }}
              >
                Sair
              </Button>
            </VStack>
          </GridItem>
        )}
        <GridItem as="main" {...variantMain} pl={2} pr={8}>
          <Outlet />
        </GridItem>
        <GridItem as="footer" {...variantFooter} pl={2}>
          Footer
        </GridItem>
      </Grid>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Paths</DrawerHeader>

          <DrawerBody color="blackAlpha.700" fontWeight="bold">
            <Sidebar items={items} spacing={8} mb={8} />
          </DrawerBody>

          <DrawerFooter>
            <HStack spacing={4}>
              <Button
                variant="outline"
                leftIcon={<FaSignOutAlt />}
                mt={4}
                mr={4}
              >
                Sair
              </Button>
              <Button
                variant="outline"
                mr={4}
                leftIcon={<FaTimes />}
                onClick={onClose}
              >
                Cancel
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default ECommerceLayout;
