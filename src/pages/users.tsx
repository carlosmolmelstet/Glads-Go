import {
  Button,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Icon,
  Td,
  Avatar,
  useDisclosure,
  useBreakpointValue,
  Spinner,
  Tooltip,
  HStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { api } from '../services/api';
import { Loading } from '../components/Utils/Loading';
import { Error } from '../components/Utils/Error';
import { ModalAddUser } from '../components/Modal/AddUser';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { TablePagination as Pagination } from '../components/Table/Pagination';
import User from '../interfaces/users/User';
import ResponseTable from '../interfaces/Table/Response';
import { Search } from '../components/Table/Search';
import { ButtonAction } from '../components/Table/ButtonAction';
import { queryClient } from '../services/queryClient';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../services/axios';
import { parseCookies } from 'nookies';
import { AuthContext } from '../context/AuthContext';
import LayoutDashboard from '../components/Layout/Index';
import UserProfile from '../interfaces/users/UserProfile';


export default function Home(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const tableLg = useBreakpointValue({ base: true, lg: false });
  const tableXl = useBreakpointValue({ base: true, xl: false });
  const pageSize = 10;
  const [page, setPage] = useState(1)
  const [userProfile, setUserProfile] = useState({} as UserProfile);
  const { user  } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);

    if(user) {
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
  }

  const mutation = useMutation(async (userId: string) => {
    return await api.delete(`User/${userId}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useQuery(['users', page], () => fetchUsers(page), { keepPreviousData: true, staleTime: 1000 * 60 });

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <LayoutDashboard profile={userProfile}>
      <Box>
        <ModalAddUser isOpen={isOpen} onClose={onClose} />
        <Flex justify="space-between">
          <Flex align="center">
            <Search />
            {!isLoading && isFetching && <Spinner ml={4} size="sm" colorScheme="gray" />}
          </Flex>
          <Button background="red.500" _hover={{backgroundColor: "red.600"}} onClick={() => onOpen()}>Adicionar</Button>
        </Flex>
        <Table >
          <Thead >
            <Tr>
              <Th>Usuário</Th>
              <Th w={10}>Posição</Th>
              {!tableLg && (
                <>
                  <Th w={60}>Telefone</Th>
                  {!tableXl && (
                    <Th w={60}>Email</Th>
                  )}
                </>
              )}
              <Th w={20}>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map(user => (
              <Tr key={user.id}>
                <Td>
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
                  <Tooltip label={user.position.name}>
                    {user.position.shortName}
                  </Tooltip>
                </Td>
                {!tableLg && (
                  <>
                    <Td>
                      {user.phone}
                    </Td>
                    {!tableXl && (
                      <Td>
                        {user.email}
                      </Td>
                    )}
                  </>
                )}
                <Td>
                  <HStack spacing={2}>
                    <ButtonAction title="editar" variant="blue" click={() => {
                      alert("editar")
                    }}>
                      <Icon as={FiEdit} fontSize={14} />
                    </ButtonAction>
                    <ButtonAction title="Excluir" variant="red" click={() => {
                      mutation.mutateAsync(user.id)
                    }}>
                      <Icon as={FiTrash2} fontSize={14} />
                    </ButtonAction>
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
  const apiClient = getAPIClient(ctx);
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