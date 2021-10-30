import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,

} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import Profile from './Profile';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export default function MobileNav({ onOpen, ...rest }: MobileProps) {
  const hideLogo = useBreakpointValue({ base: false, md: true })

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Logo hide={hideLogo} />
      <HStack spacing="6">
        <ThemeSwitch />
        <Profile />
      </HStack>
    </Flex>
  );
};