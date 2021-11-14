import { Button, Box, Input, Flex, Stack, useToast, useColorMode, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Logo from '../components/Layout/Logo';
import { AuthContext } from '../context/AuthContext';

export default function Home(): JSX.Element {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm();
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
          <Stack borderRadius={16} display="flex" flexDir="column" spacing={4} alignItems="center" justify="center" position="relative" background="gray.800" margin={4} px={8} py={16} w={500} >
            <Logo />
            <Input placeholder="Email" type="email" {...register('email')} />
            <Input placeholder="Senha" type="password" {...register('password')} />
            <Button width="100%" background="red.500" _hover={{backgroundColor: "red.600"}} onClick={handleSubmit(handleSignIn)} isLoading={formState.isSubmitting}>Entrar</Button>
            <Link href="/singUp">
              <Text _hover={{color: "red.500", cursor: "pointer"}}>Criar uma conta</Text>
            </Link>
          </Stack>
      </Flex>
    </>
  );
}
