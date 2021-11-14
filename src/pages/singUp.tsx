import { Button, Box, Input, Flex, Stack, useToast, useColorMode, Text } from '@chakra-ui/react';
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
      <Flex w="100vw" h="100vh" overflow="hidden" justify="center" align="center" position="relative">
        <Box src="/bannerLogin.png" position="absolute" w="150vw" h="150vh" backgroundSize="cover" backgroundPosition="center"  backgroundImage="url('/bannerLogin.png')"></Box>
          <Stack borderRadius={16} display="flex" flexDir="column" spacing={4} alignItems="center" justify="center" position="relative" background="gray.800" margin={4} px={8} py={16} w={600} >
            <FormAddImage closeModal={() => Router.push('/')}/>
          </Stack>
      </Flex>
    </>
  );
}
