import { Box, Container, Image, useColorMode } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useEffect } from 'react'
import { FormAddUser } from '../components/Form/FormAddUser'

export default function Home(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode !== 'dark') {
      toggleColorMode()
    }
  }, [])

  return (
    <Box position="relative">
      <Image src="/logo.svg" w="50px" m={4} />
      <Container
        maxW="container.xl"
        mt={20}
        overflow="hidden"
        justify="center"
        align="center"
        position="relative"
      >
        <FormAddUser closeModal={() => Router.push('/')} />
      </Container>
    </Box>
  )
}
