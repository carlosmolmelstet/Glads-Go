import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import UserProfile from '../../interfaces/users/UserProfile'
import MobileNav from './MobileNav'
import SidebarContent from './SidebarContent'

interface LayoutDashboardProps {
  children: ReactNode
  profile: UserProfile
}

export default function LayoutDashboard({
  children,
  profile
}: LayoutDashboardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh">
      <SidebarContent
        profile={profile}
        onClose={() => onClose}
        display={{ base: 'none', lg: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent bg={useColorModeValue('white', 'gray.900')}>
          <SidebarContent profile={profile} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav profile={profile} onOpen={onOpen} />
      <Box ml={{ base: 0, lg: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}
