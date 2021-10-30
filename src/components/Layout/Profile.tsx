import React from 'react';
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

export default function Profile() {

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
              src={
                'https://i.ibb.co/K7sWNd5/42452946-2220860294903317-2695271421973626880-n.jpg'
              }
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">Carlos Molmelstet</Text>
              <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.500")}>
                Admin
              </Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
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