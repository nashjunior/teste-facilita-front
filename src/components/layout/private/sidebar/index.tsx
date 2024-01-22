// Sidebar.tsx
import React, { useCallback, useMemo } from 'react';
import {
  Text,
  Collapse,
  useDisclosure,
  HStack,
  Button,
  ListItem,
  List,
  ListIcon,
  type ListProps,
  type ListItemProps,
  Link,
} from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { type IconType } from 'react-icons/lib';
import { useLocation, Link as LinkRouterDOm } from 'react-router-dom';

interface ISidebarItemProps {
  item: ISidebarItem;
  selected: string;
  depth?: number;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  item,
  selected,
  depth = 0,
  ...props
}) => {
  const { label, to, icon: Icon, items } = item;

  const hasItems = items != null && items.length > 0;

  const suItemIncludeRoutes = useCallback(
    (item2: ISidebarItem[]): boolean => {
      return item2.some((i) => {
        if (i.items != null && i.items.length > 0)
          return suItemIncludeRoutes(i.items);

        return i.to === selected;
      });
    },
    [selected]
  );
  const isRouteSelected = useMemo(
    () => to === selected || (hasItems && suItemIncludeRoutes(items)),
    [to, selected, items, hasItems, suItemIncludeRoutes]
  );

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: isRouteSelected,
  });

  const SubMenu = useMemo(() => {
    if (Icon == null) return null;

    return (
      <ListIcon
        as={Icon}
        color="white"
        border="1px solid var(--chakra-colors-cyan-100)"
        boxShadow={
          isRouteSelected ? '1px 1px 3px var(--chakra-colors-gray-400)' : 'none'
        }
        // boxSize={12}
        p={2}
        bg="cyan.400"
        boxSizing="content-box"
        borderRadius={8}
      />
    );
  }, [Icon, isRouteSelected]);

  const Menu = React.memo(({ children }: { children: React.ReactNode }) => {
    if (hasItems) {
      return (
        <HStack
          w={'100%'}
          py={3}
          pl={2}
          onClick={onToggle}
          cursor={'pointer'}
          _hover={{
            bg: isRouteSelected ? undefined : 'var(--chakra-colors-gray-200)',
          }}
          // justifyContent={'space-between'}
        >
          {children}
        </HStack>
      );
    }

    return (
      <Link
        w={'100%'}
        display={'flex'}
        h={14}
        py={3}
        pl={2}
        justifyContent={'flex-start'}
        gap={'var(--chakra-space-4)'}
        as={LinkRouterDOm}
        to={to}
        bg={isRouteSelected ? 'white' : 'none'}
        borderRadius={8}
        style={{ textDecoration: 'none' }}
        _hover={{
          bg: isRouteSelected ? undefined : 'var(--chakra-colors-gray-200)',
        }}
        position={'relative'}
      >
        {children}
      </Link>
    );
  });

  Menu.displayName = `Menu-${depth}`;

  const MemoizedSidebarItem = React.memo(SidebarItem);

  return (
    <ListItem {...props} w="100%" borderRadius={4}>
      <Menu>
        {SubMenu}
        <HStack w="100%" justifyContent="space-between">
          <Text
            fontWeight={'600'}
            fontSize={'0.875rem'}
            lineHeight={0}
            textDecoration={'none'}
          >
            {label}
          </Text>

          {hasItems && (
            <Button
              aria-label="Toggle Submenu"
              variant="ghost"
              _hover={{ bg: 'none' }}
            >
              {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
            </Button>
          )}
        </HStack>
      </Menu>

      <Collapse in={isOpen}>
        <List w="100%" spacing={2} pl={6}>
          {items?.map((subItem, index) => (
            <MemoizedSidebarItem
              key={
                subItem.to ??
                'depth'.concat((depth ?? 0).toString()).concat(index.toString())
              }
              item={subItem}
              selected={selected}
              depth={(depth ?? 0) + 1}
            />
          ))}
        </List>
      </Collapse>
    </ListItem>
  );
};

export interface ISidebarItem extends ListItemProps {
  label: string;
  to?: string;
  icon?: IconType;
  items?: ISidebarItem[];
  selected?: string;
  depth?: number;
}

interface ISidebarProps extends ListProps {
  items: ISidebarItem[];
}

// eslint-disable-next-line react/display-name
const Sidebar: React.FC<ISidebarProps> = React.memo(({ items, ...props }) => {
  const currentPath = useLocation();

  const suItemIncludeRoutes = useCallback(
    (item2: ISidebarItem[]): boolean => {
      return item2.some((i) => {
        if (i.items != null && i.items.length > 0) {
          return suItemIncludeRoutes(i.items);
        }

        return i.to === currentPath.pathname;
      });
    },
    [currentPath.pathname]
  );

  const MemoizedSidebarItem = React.memo(SidebarItem);

  return (
    <List {...props} minH="70%">
      {items.map((item, index) => (
        <MemoizedSidebarItem
          item={item}
          selected={currentPath.pathname}
          key={item.to ?? 'depth'.concat(index.toString())}
        />
      ))}
    </List>
  );
});

export default Sidebar;
