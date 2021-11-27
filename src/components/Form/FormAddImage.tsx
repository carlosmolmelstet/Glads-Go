import { Box, Button, Flex, SimpleGrid, Stack, useToast, Select, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import User from '../../interfaces/users/User';
import Position from '../../interfaces/positions/Position';
import { PhoneInput } from '../Input/PhoneInput';

interface FormAddImageProps {
  closeModal: () => void;
}
export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const [positions, setPositions] = useState<Position[]>([]);
  const toast = useToast();

  async function fetchPositions() {
    const { data } = await api.get<Position[]>('User/Positions');
    setPositions(data);
  }

  useEffect(() => {
    fetchPositions();
  }, []);

  const formValidations = {
    name: {
      required: 'Nome é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 3 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 50 caracteres',
      },
    },
    positionId: {
      required: 'Posição é obrigatória',
    },
    phone: {
      required: 'Telefone é obrigatório',
      pattern: {
        value: /\(\d{2,}\) \d{4,}\-\d{4}/g,
        message: 'Telefone invalido',
      },
    },
    email: {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Email invalido',
      },
    },
    password: {
      required: 'Senha é obrigatório',
      minLength: {
        value: 4,
        message: 'Mínimo de 4 caracteres',
      },
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (user: User) => {
      await api.post('User/Save', {
        ...user,
        imageUrl: imageUrl
      }).catch(function (error) {
        if (error.response) {
          throw error.response.data;
        }
      });;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      }
    }
  );

  function Teste(e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
  }

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: User): Promise<void> => {
    try {
      await mutation.mutateAsync(data);
      toast({
        title: 'Usuario cadastrado',
        description: 'Seu usuario foi cadastrada com sucesso.',
        status: 'success',
      });
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    } catch (exception) {
      toast({
        title: 'Falha no cadastro',
        description: exception,
        status: 'error',
      });
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)} mb={4}>
      <Stack spacing={4}>
        <Flex align="flex-end">
          <FileInput
            setImageUrl={setImageUrl}
            localImageUrl={localImageUrl}
            setLocalImageUrl={setLocalImageUrl}
            setError={setError}
            trigger={trigger}
            {...register('image')}
            error={errors.image}
          />
          <Box ml={4} w="100%">
            <TextInput
              placeholder="Nome do usuario"
              label="Nome"
              {...register('name', formValidations.name)}
              error={errors.name}
            />
          </Box>
        </Flex>
        <SimpleGrid columns={2} spacing={4}>
          <Select
            placeholder="Posição"
            {...register('positionId', formValidations.positionId)}
            error={errors.positionId}
            size="lg"
          >
            {positions.map(position => (
              <option key={position.id} value={position.id}>{position.name}</option>
            ))}
          </Select>
          <PhoneInput
            placeholder="Telefone"
            {...register('phone', formValidations.phone)}
            error={errors.phone}
          />
          <TextInput
            placeholder="gladiators@gmail.com"
            label="Email"
            {...register('email', formValidations.email)}
            error={errors.email}
          />
          <TextInput
            placeholder="******"
            label="Senha"
            {...register('password', formValidations.password)}
            error={errors.password}
            type="password"
          />
          <Button
            onClick={closeModal}
            type="button"
            float="right"
            py={6}
          >
            Cancelar
          </Button>
          <Button
            isLoading={formState.isSubmitting}
            isDisabled={formState.isSubmitting}
            type="submit"
            float="right"
            background="red.500"
            _hover={{ backgroundColor: "red.600" }}
            py={6}
          >
            Criar usuário
          </Button>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}