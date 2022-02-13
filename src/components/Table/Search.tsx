import React from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export function Search(props: InputProps) {
  return (
    <InputGroup w="100%">
      <InputLeftElement pointerEvents="none" color="gray.400">
        <FiSearch />
      </InputLeftElement>
      <Input type="tel" placeholder="Pesquisar" {...props} />
    </InputGroup>
  )
}
