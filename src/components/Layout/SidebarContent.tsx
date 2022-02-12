import { Box, BoxProps, CloseButton, Flex, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { IconType } from 'react-icons'
import { FiLayout, FiUsers } from 'react-icons/fi'
import { MdOutlineEmojiEvents } from 'react-icons/md'
import UserProfile from '../../interfaces/users/UserProfile'
import Logo from './Logo'
import NavItem from './NavItem'
interface SidebarProps extends BoxProps {
  onClose: () => void
  profile: UserProfile
}

interface LinkItemProps {
  name: string
  icon: IconType
  route: string
  restricted: boolean
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Usuarios',
    icon: FiUsers,
    route: '/users',
    restricted: true
  },
  {
    name: 'Ranking',
    icon: MdOutlineEmojiEvents,
    route: '/ranking',
    restricted: false
  },
  {
    name: 'Pontos',
    icon: FiLayout,
    route: '/points',
    restricted: true
  }
]

export default function SidebarContent({
  onClose,
  profile,
  ...rest
}: SidebarProps) {
  const router = useRouter()
  const menus =
    profile.role === 2
      ? LinkItems
      : LinkItems.filter(e => e.restricted === false)

  return (
    <Box w={{ base: 'full', lg: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      <Stack spacing={1}>
        {menus.map(link => (
          <NavItem
            onClick={onClose}
            mx="4"
            key={link.name}
            route={link.route}
            icon={link.icon}
            isActive={router.pathname === link.route}
          >
            {link.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  )
}
