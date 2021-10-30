import React, { ReactNode } from 'react';
import { Flex, Icon, Link, FlexProps, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import NextLink from 'next/link'

import { ReactText } from 'react';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  isActive?: boolean;
  route: string;
}

export default function NavItem({ icon, isActive = false, route, children, ...rest }: NavItemProps) {

  return (
    <NextLink href={route}>
      <Link
        style={{ textDecoration: 'none' }}
        _focus={{
          boxShadow: "none"
        }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: useColorModeValue("gray.50", "gray.700"),
          }}
          bg={isActive ? useColorModeValue("gray.50", "gray.700") : ""}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>

  );
};
