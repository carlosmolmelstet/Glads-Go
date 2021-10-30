import React from 'react';
import {
  useColorModeValue,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import {
  MdNightlight,
  MdWbSunny
} from 'react-icons/md';

export default function ThemeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="lg"
      variant="ghost"
      aria-label="open menu"
      onClick={toggleColorMode}
      _hover={{
        bg: useColorModeValue('gray.50', 'gray.700')
      }}
      _focus={{
        boxShadow: "none"
      }}
      icon={useColorModeValue(<MdWbSunny />, <MdNightlight />)}
    />
  );
};