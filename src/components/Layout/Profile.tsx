import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {FiChevronDown,} from 'react-icons/fi';
import UserProfile from '../../interfaces/users/UserProfile';

interface ProfileProps {
  profile: UserProfile;
}

export default function Profile({profile}: ProfileProps) {
  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton
          py={2}
          transition="all 0.3s"
          _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar
              size={'sm'}
              src={profile.imageUrl}
              name={profile.name}
            />
            <VStack
              display={{ base: 'none', lg: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">{profile.name}</Text>
              <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.500")}>
                {profile.positionName}
              </Text>
            </VStack>
            <Box display={{ base: 'none', lg: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <MenuItem>Perfil</MenuItem>
          <MenuItem>Configuração</MenuItem>
          <MenuDivider />
          <MenuItem>Log Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};