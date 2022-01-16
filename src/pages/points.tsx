import {
  Button,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Input as ChakraInput,
  Spinner,
  Tooltip,
  HStack,
  Checkbox,
  Icon,
  useNumberInput,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Loading } from '../components/Utils/Loading';
import { Error } from '../components/Utils/Error';
import { TablePagination as Pagination } from '../components/Table/Pagination';
import User from '../interfaces/users/User';
import ResponseTable from '../interfaces/Table/Response';
import { Search } from '../components/Table/Search';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../services/axios';
import { parseCookies } from 'nookies';
import { AuthContext } from '../context/AuthContext';
import LayoutDashboard from '../components/Layout/Index';
import UserProfile from '../interfaces/users/UserProfile';
import { FiPlus, FiMinus } from "react-icons/fi";
import { QueryClient, useMutation, useQuery } from 'react-query';
import { queryClient } from '../services/queryClient';

export default function Points(): JSX.Element {
  const windowSmall = useBreakpointValue({ base: true, sm: false });
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [requestIsLoading, setRequestIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({} as UserProfile);
  const [userIds, setUserIds] = useState<string[]>([]);
  const toast = useToast();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        positionName: user.position?.name,
      } as UserProfile);
    }
  }, [user]);

  async function fetchUsers(pageParam: number): Promise<ResponseTable<User>> {
    const { data } = await api.post(`user/Filter`, {
      page: pageParam,
      pageSize: pageSize
    });
    return data;
  };

  const mutation = useMutation(async () => {
    return await await api.post("User/Points", {
      userIds,
      points: valueAsNumber
    }).catch(function (error) {
      if (error.response) {
        throw error.response.data;
      }
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('usersPoints')
    }
  });

  const onSubmit = async () => {

    if(userIds.length == 0) {
      toast({
        title: 'Nenhum usuario foi marcardo',
        description: 'Marque um usuarios para alterar a pontuação',
        status: 'info',
      });
      return;
    }

    setRequestIsLoading(true);
    try {
      await mutation.mutateAsync();
      toast({
        title: 'Usuario cadastrado',
        description: 'Seu usuario foi cadastrada com sucesso.',
        status: 'success',
      });
      setRequestIsLoading(false);
    } catch (exception) {
      toast({
        title: 'Falha no cadastro',
        description: exception,
        status: 'error',
      });
      setRequestIsLoading(false);
    }
  };

  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useQuery(['usersPoints', page], () => fetchUsers(page), { keepPreviousData: true, staleTime: 1000 * 60 });

  function checkUser(userId: string, e) {
    const usersCheckd = userIds;
    if(e.target.checked) {
      usersCheckd.push(userId);
      setUserIds(usersCheckd);
    } else {
      const index = usersCheckd.findIndex(e => e == userId);
      usersCheckd.splice(index, 1);
      setUserIds(usersCheckd);
    }
  }

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } =
    useNumberInput({
      step: 5,
      defaultValue: 0,
      min: -999,
      max: 999,
    });

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }
  
  return (
    <LayoutDashboard profile={userProfile}>
      <Box>
        <Flex justify="space-between" direction={windowSmall ? "column" : "row"} align="center">
          <Flex align="center" width={windowSmall ? "100%" : 60}>
            <Search />
            {!isLoading && isFetching && <Spinner ml={4} size="sm" colorScheme="gray" />}
          </Flex>
          <Flex mt={windowSmall ? 4 : 0}>
            <Flex maxW='320px' border="1px solid" borderColor="gray.800" borderRadius={8}>
              <Button
                borderRightRadius={0}
                {...dec}
              >
                <Icon as={FiMinus} />
              </Button>
              <ChakraInput
                w={20}
                textAlign="center"
                borderRadius={0}
                border={0}
                _focus={{
                  outline: "none"
                }}
                {...input}
              />
              <Button
                borderLeftRadius={0}
                {...inc}
              >
                <Icon as={FiPlus} />
              </Button>
            </Flex>
            <Button ml={4} onClick={onSubmit} isLoading={requestIsLoading}>Aplicar</Button>
          </Flex>
        </Flex>
        <Table >
          <Thead >
            <Tr>
              <Th>Usuário</Th>
              <Th w={10}>Pontos</Th>
              <Th w={10}>Posição</Th>
              <Th w={20}>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map(user => (
              <Tr key={user.id}>
                <Td wordBreak="break-word">
                  <Flex align="center">
                    <Avatar
                      size={'sm'}
                      src={user.imageUrl}
                      name={user.name}
                      mr={4}
                    />
                    {user.name}
                  </Flex>
                </Td>
                <Td textAlign="center">
                  {user.points}
                </Td>
                <Td textAlign="center">
                  <Tooltip label={user.position.name}>
                    {user.position.shortName}
                  </Tooltip>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Checkbox iconSize="lg" size="lg" onChange={e => checkUser(user.id, e)}></Checkbox>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination
          total={data.total}
          changePage={setPage}
          pageSize={pageSize}
        />
      </Box>
    </LayoutDashboard>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['glads-token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}