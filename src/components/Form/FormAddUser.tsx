import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  useToast,
  Heading,
  Divider,
  Input as ChakraInput,
  Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { Input } from './Input';
import User from '../../interfaces/users/User';
import Position from '../../interfaces/positions/Position';
import { Select } from './Select';
import SelectData from '../../interfaces/Form/SelectData';
import { EmergencyContacts } from '../EmergencyContacts/EmergencyContacts';
import EmergencyContact from '../../interfaces/EmergencyContacts/EmergencyContact';
import { Loading } from '../Utils/Loading';

interface FormAddUserProps {
  closeModal: () => void;
  userId?: string;
}

export function FormAddUser({
  closeModal,
  userId,
}: FormAddUserProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [positions, setPositions] = useState<SelectData<string>[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
    setValue,
  } = useForm();
  const { errors } = formState;
  const formValidations = {
    id: {
      maxLength: {
        value: 50,
        message: 'id invalido',
      },
    },
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
    surname: {
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
    cpf: {
      required: 'CPF é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    rg: {
      required: 'RG é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    birthDate: {
      required: 'Data de nascimento é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    height: {
      required: 'Altura é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    weight: {
      required: 'Peso é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    cep: {
      required: 'CEP é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    address: {
      required: 'Rua é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    addressNumber: {
      required: 'Numero é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    city: {
      required: 'cidade é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
      },
    },
    state: {
      required: 'Estado é obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 14 caracteres',
      },
      maxLength: {
        value: 50,
        message: 'Máximo de 14 caracteres',
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
    jerseyNumber: {
      maxLength: {
        value: 3,
        message: 'Máximo de 3 caracteres',
      },
    },
  };

  useEffect(() => {
    fetchPositions();

    async function fetchPositions() {
      const { data } = await api.get<Position[]>('User/Positions');
      const listPositions: SelectData<string>[] = data.map(item => {
        return {
          id: item.id,
          description: item.name,
        };
      });
      setPositions(listPositions);
      if (userId) {
        await fetchUser(userId);
      }

      setIsLoading(false);
    }

    async function fetchUser(userId: string) {
      const { data } = await api.get<User>(`User/${userId}`);
      data.birthDate = data.birthDate.substring(0, 10);
      const fields = Object.getOwnPropertyNames(formValidations);
      fields.map(field => setValue(field, data[field]));
      document.getElementsByName('phone')[0].focus();
      document.getElementsByName('name')[0].focus();
      setContacts(data.emergencyContacts);
    }
  }, []);

  const mutation = useMutation(
    async (user: User) => {
      await api
        .post('User/Save', {
          ...user,
          imageUrl,
        })
        .catch(function (error) {
          if (error.response) {
            throw error.response.data;
          }
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

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
    <>
      {isLoading && (
        <Flex
          bg="gray.800"
          position="absolute"
          w="100%"
          top="0"
          left="0"
          bottom="0"
          justify="center"
          align="center"
          zIndex="overlay"
          borderRadius={8}
        >
          <Loading />
        </Flex>
      )}
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)} mb={4}>
        <Flex direction="column" align="flex-start" w="100%">
          <Heading>Informações Pessoais</Heading>
          <Divider mb={8} mt={4} />
          <Stack spacing={4} w="100%">
            <Flex>
              {userId && <ChakraInput type="hidden" {...register('id')} />}
              <FileInput
                setImageUrl={setImageUrl}
                localImageUrl={localImageUrl}
                setLocalImageUrl={setLocalImageUrl}
                setError={setError}
                trigger={trigger}
                {...register('image')}
                error={errors.image}
              />
              <Box ml={4} w="50%">
                <Input
                  placeholder="Nome"
                  label="Nome"
                  type="text"
                  autoFocus
                  {...register('name', formValidations.name)}
                  error={errors.name}
                />
              </Box>
              <Box ml={4} w="50%">
                <Input
                  placeholder="Sobrenome"
                  label="Nome"
                  type="text"
                  {...register('surname', formValidations.surname)}
                  error={errors.surname}
                />
              </Box>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <Input
                placeholder="1.88"
                label="CPF"
                type="text"
                {...register('cpf', formValidations.cpf)}
                error={errors.cpf}
              />
              <Input
                placeholder="1.88"
                label="RG"
                type="text"
                {...register('rg', formValidations.rg)}
                error={errors.rg}
              />
              <Input
                placeholder="1.88"
                label="Nascimento"
                type="date"
                {...register('birthDate', formValidations.birthDate)}
                error={errors.birthDate}
              />
              <Input
                placeholder="1.88"
                label="Altura"
                type="text"
                {...register('height', formValidations.height)}
                error={errors.height}
              />
              <Input
                placeholder="80"
                label="Peso"
                type="text"
                {...register('weight', formValidations.weight)}
                error={errors.weight}
              />
              <Input
                label="Telefone"
                type="phone"
                {...register('phone', formValidations.phone)}
                error={errors.phone}
              />
              <Input
                label="Numero da Camisa"
                type="text"
                {...register('jerseyNumber', formValidations.jerseyNumber)}
                error={errors.jerseyNumber}
              />
              <Select
                label="Posição"
                {...register('positionId', formValidations.positionId)}
                error={errors.positionId}
                data={positions}
              />
            </SimpleGrid>
          </Stack>
        </Flex>
        <Flex direction="column" align="flex-start" w="100%">
          <Heading mt={8}>Endereço</Heading>
          <Divider mb={8} mt={4} />
          <Stack spacing={4} w="100%">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <Input
                label="CEP"
                type="text"
                {...register('cep', formValidations.cep)}
                error={errors.cep}
              />
              <Input
                label="Rua"
                type="text"
                {...register('address', formValidations.address)}
                error={errors.address}
              />
              <Input
                label="Numero"
                type="text"
                {...register('addressNumber', formValidations.addressNumber)}
                error={errors.addressNumber}
              />
              <Input
                label="Cidade"
                type="text"
                {...register('city', formValidations.city)}
                error={errors.city}
              />
              <Input
                label="Estado"
                type="text"
                {...register('state', formValidations.state)}
                error={errors.state}
              />
            </SimpleGrid>
          </Stack>
        </Flex>
        <Flex direction="column" align="flex-start" w="100%">
          <Heading mt={8}>Conta</Heading>
          <Divider mb={8} mt={4} />
          <Stack spacing={4} w="100%">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <Input
                placeholder="gladiators@gmail.com"
                label="Email"
                type="text"
                {...register('email', formValidations.email)}
                error={errors.email}
              />
              <Input
                placeholder="******"
                label="Senha"
                type="password"
                {...register('password', formValidations.password)}
                error={errors.password}
              />
            </SimpleGrid>
          </Stack>
        </Flex>
        <Flex direction="column" align="flex-start" w="100%">
          <Heading mt={8}>Contatos de emergência</Heading>
          <Divider mb={8} mt={4} />
          <EmergencyContacts
            formState={formState}
            register={register}
            data={contacts}
            userId={userId}
          />
        </Flex>
        <Flex justify="flex-end" mt={4}>
          <Button
            onClick={closeModal}
            type="button"
            float="right"
            py={6}
            mr={4}
          >
            Cancelar
          </Button>
          <Button
            isLoading={formState.isSubmitting}
            isDisabled={formState.isSubmitting}
            type="submit"
            float="right"
            background="red.500"
            _hover={{ backgroundColor: 'red.600' }}
            py={6}
          >
            Salvar
          </Button>
        </Flex>
      </Box>
    </>
  );
}
