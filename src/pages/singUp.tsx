import { Button, Box, Input, Flex, Stack, useToast, useColorMode, Text, Image } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Logo from '../components/Layout/Logo';
import { AuthContext } from '../context/AuthContext';
import { FormAddImage } from '../components/Form/FormAddImage';
import Router from 'next/router'

export default function Home(): JSX.Element {
  const { signIn } = useContext(AuthContext);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode != "dark") {
      toggleColorMode();
    }
   }, []);

  async function handleSignIn(data) {
    await signIn(data).catch(function (error) {
      toast({
        title: 'Erro',
        description: error.response.data.message,
        status: 'error',
      });
    });;
  }

  return (
    <>
      <Image src="/logo.svg" w="50px" mb={4} position="absolute" top={4} left={4} />
      <Flex w="100vw" h="100vh" overflow="hidden" justify="center" align="center" position="relative">
            <FormAddImage closeModal={() => Router.push('/')}/>
      </Flex>
    </>
  );
}
