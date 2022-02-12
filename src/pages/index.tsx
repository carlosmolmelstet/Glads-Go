import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link as ChakraLink,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'

export default function Home(): JSX.Element {
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit, formState } = useForm()
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode !== 'dark') {
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
    })
  }

  return (
    <>
      <Flex position="relative">
        <Flex
          h="100vh"
          w="100%"
          mx="auto"
          justifyContent="space-around"
          alignItems="center"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{ userSelect: 'none' }}
            w={{ base: '100%', md: '60vw' }}
            maxW="600px"
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="48px"
              mt={{ md: '150px', lg: '80px' }}
            >
              <Image src="/logo.svg" w="80px" mb={4} />
              <Heading color="red.500" fontSize="32px" mb={2}>
                Bem vindo.
              </Heading>
              <Text ms="4px" color="gray.200" fontSize="14px">
                Insira com seu email e senha para entrar...
              </Text>
              <FormControl mt={6}>
                <FormLabel ms="4px" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  borderRadius="4px"
                  mb={4}
                  type="text"
                  placeholder="gladiators@gmail.com"
                  size="lg"
                  {...register('email')}
                />
                <FormLabel ms="4px" fontWeight="normal">
                  Senha
                </FormLabel>
                <Input
                  borderRadius="4px"
                  type="password"
                  placeholder="*****"
                  size="lg"
                  {...register('password')}
                />
                <Button
                  type="submit"
                  bg="red.500"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: 'red.600'
                  }}
                  _active={{
                    bg: 'red.400'
                  }}
                  onClick={handleSubmit(handleSignIn)}
                  isLoading={formState.isSubmitting}
                >
                  Entrar
                </Button>
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Link href="/singUp">
                  <Text color="gray.600" fontWeight="medium">
                    Ainda não tem uma conta?
                    <ChakraLink color="red" ms="5px" fontWeight="bold">
                      Clique aqui
                    </ChakraLink>
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Box
            display={{ base: 'none', lg: 'flex' }}
            overflowX="hidden"
            w="40vw"
          >
            <Image src="/loginIllustration.svg" />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
