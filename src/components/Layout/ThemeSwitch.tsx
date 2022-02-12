import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { MdNightlight, MdWbSunny } from 'react-icons/md'

export default function ThemeSwitch() {
  const { toggleColorMode } = useColorMode()

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
        boxShadow: 'none'
      }}
      icon={useColorModeValue(<MdWbSunny />, <MdNightlight />)}
    />
  )
}
