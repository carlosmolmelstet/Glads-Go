import { Button, Box, Input } from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

export default function Home(): JSX.Element {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  async function handleSignIn(data) {
    await signIn(data);
  }

  return (
    <>
      <Box maxW={1120} px={[10, 15, 20]} mx="auto" my={[10, 15, 20]}>
        <Input type="email" {...register('email')} />
        <Input type="password" {...register('password')} />
        <Button onClick={handleSubmit(handleSignIn)}>Login</Button>
      </Box>
    </>
  );
}