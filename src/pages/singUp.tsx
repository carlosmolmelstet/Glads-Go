import {
  Button,
  Box,
  Input,
  Flex,
  Stack,
  useToast,
  useColorMode,
  Text,
  Image,
  Container
} from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Logo from '../components/Layout/Logo'
import { AuthContext } from '../context/AuthContext'
import { FormAddUser } from '../components/Form/FormAddUser'
import Router from 'next/router'

export default function Home(): JSX.Element {
  const { signIn } = useContext(AuthContext)
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode != 'dark') {
      toggleColorMode()
    }
  }, [])

  async function handleSignIn(data) {
    await signIn(data).catch(function (error) {
      toast({
        title: 'Erro',
        description: error.response.data.message,
        status: 'error'
      })
    });
  }

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
        <FormAddUser closeModal={() => Router.push('/')}/>
      </Container>
    </Box>
  )
}
