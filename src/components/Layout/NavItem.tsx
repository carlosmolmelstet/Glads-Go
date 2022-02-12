import {
  Flex,
  FlexProps,
  Icon,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { ReactText } from 'react'
import { IconType } from 'react-icons'

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  isActive?: boolean
  route: string
}

export default function NavItem({
  icon,
  isActive = false,
  route,
  children,
  ...rest
}: NavItemProps) {
  return (
    <NextLink href={route}>
      <Link
        style={{ textDecoration: 'none' }}
        _focus={{
          boxShadow: 'none'
        }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: useColorModeValue('gray.50', 'gray.700')
          }}
          bg={isActive ? useColorModeValue('gray.50', 'gray.700') : ''}
          {...rest}
        >
          {icon && <Icon mr="4" fontSize="16" as={icon} />}
          {children}
        </Flex>
      </Link>
    </NextLink>
  )
}
