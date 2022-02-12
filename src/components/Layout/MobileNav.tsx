import {
  Flex,
  FlexProps,
  HStack,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import UserProfile from '../../interfaces/users/UserProfile'
import Logo from './Logo'
import Profile from './Profile'
import ThemeSwitch from './ThemeSwitch'

interface MobileProps extends FlexProps {
  onOpen: () => void
  profile: UserProfile
}
export default function MobileNav({ profile, onOpen, ...rest }: MobileProps) {
  const hideLogo = useBreakpointValue({ base: false, lg: true })

  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: 'space-between', lg: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Logo hide={hideLogo} />
      <HStack spacing="6">
        <ThemeSwitch />
        <Profile profile={profile} />
      </HStack>
    </Flex>
  )
}
