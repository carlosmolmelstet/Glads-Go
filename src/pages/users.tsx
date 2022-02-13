import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useMutation, useQuery } from 'react-query'
import LayoutDashboard from '../components/Layout/Index'
import { ModalAddUser } from '../components/Modal/AddUser'
import { ButtonAction } from '../components/Table/ButtonAction'
import { TablePagination as Pagination } from '../components/Table/Pagination'
import { Search } from '../components/Table/Search'
import { Error } from '../components/Utils/Error'
import { Loading } from '../components/Utils/Loading'
import { AuthContext } from '../context/AuthContext'
import ResponseTable from '../interfaces/Table/Response'
import User from '../interfaces/users/User'
import UserProfile from '../interfaces/users/UserProfile'
import { api } from '../services/api'
import { getAPIClient } from '../services/axios'
import { queryClient } from '../services/queryClient'
export default function Home(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const tableLg = useBreakpointValue({ base: true, lg: false })
  const tableXl = useBreakpointValue({ base: true, xl: false })
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const [editUserId, setEditUserId] = useState<string>('')
  const [userProfile, setUserProfile] = useState({} as UserProfile)
  const { user } = useContext(AuthContext)
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [userDeleteId, setUserDeleteId] = useState('')
  const cancelRef = useRef()

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        positionName: user.position?.name,
        role: user.role
      } as UserProfile)
    }
  }, [user])

  async function fetchUsers(
    pageParam: number,
    search = ''
  ): Promise<ResponseTable<User>> {
    const { data } = await api.post('user/Filter', {
      page: pageParam,
      pageSize: pageSize,
      search: search
    })
    return data
  }

  let timeout = null
  function searchUsers(search: string) {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      setSearch(search)
    }, 1000)
  }

  const mutation = useMutation(
    async (userId: string) => {
      return await api.delete(`User/${userId}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  function openDeleteAlert(userId: string) {
    setIsOpenAlert(true)
    setUserDeleteId(userId)
  }

  function deleteUser() {
    mutation.mutateAsync(userDeleteId)
    setIsOpenAlert(false)
  }

  const { data, isLoading, isError, isFetching } = useQuery(
    ['users', page, search],
    () => fetchUsers(page, search),
    { keepPreviousData: true, staleTime: 1000 * 60 }
  )
  function editUser(userId: string) {
    setEditUserId(userId)
    onOpen()
  }

  function createUser() {
    setEditUserId('')
    onOpen()
  }

  if (isLoading && !isError) {
    return <Loading />
  }

  if (!isLoading && isError) {
    return <Error />
  }
  return (
    <LayoutDashboard profile={userProfile}>
      <Box>
        <ModalAddUser isOpen={isOpen} onClose={onClose} userId={editUserId} />
        <AlertDialog
          isOpen={isOpenAlert}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Excluir Usuario
              </AlertDialogHeader>
              <AlertDialogBody>
                Tem certeza que deseja excluir o usuario?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsOpenAlert(false)}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={deleteUser} ml={3}>
                  Excluir
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Flex justify="space-between">
          <Flex align="center">
            <Search onChange={e => searchUsers(e.target.value)} />
            {!isLoading && isFetching && (
              <Spinner ml={4} size="sm" colorScheme="gray" />
            )}
          </Flex>
          <Button
            background="red.500"
            _hover={{ backgroundColor: 'red.600' }}
            onClick={() => createUser()}
          >
            Adicionar
          </Button>
        </Flex>
        <Table maxW="100vw" overflow="hidden">
          <Thead>
            <Tr>
              <Th>Usuário</Th>
              <Th w={10}>Posição</Th>
              {!tableLg && (
                <>
                  <Th w={60}>Telefone</Th>
                  {!tableXl && <Th w={60}>Email</Th>}
                </>
              )}
              <Th w={20}>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map(user => (
              <Tr key={user.id} wordBreak="break-word">
                <Td>
                  <Flex align="center">
                    <Avatar
                      size={'sm'}
                      src={user.imageUrl}
                      name={user.name + ' ' + user.surname}
                      mr={4}
                    />
                    {user.name + ' ' + user.surname}
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Tooltip label={user.position.name}>
                    {user.position.shortName}
                  </Tooltip>
                </Td>
                {!tableLg && (
                  <>
                    <Td>{user.phone}</Td>
                    {!tableXl && <Td>{user.email}</Td>}
                  </>
                )}
                <Td>
                  <HStack spacing={2}>
                    <ButtonAction
                      title="editar"
                      variant="blue"
                      click={() => {
                        editUser(user.id)
                      }}
                    >
                      <Icon as={FiEdit} fontSize={14} />
                    </ButtonAction>
                    <ButtonAction
                      title="Excluir"
                      variant="red"
                      click={() => openDeleteAlert(user.id)}
                    >
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
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'glads-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const api = getAPIClient(ctx)
  const { data } = await api.get<User>('/User/RecoverUserInformation')
  if (data.role !== 2) {
    return {
      redirect: {
        destination: '/ranking',
        permanent: false
      }
    }
  } else {
    return {
      props: {}
    }
  }
}
