import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Input as ChakraInput,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
  useNumberInput,
  useToast
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useMutation, useQuery } from 'react-query'
import LayoutDashboard from '../components/Layout/Index'
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

export default function Points(): JSX.Element {
  const windowSmall = useBreakpointValue({ base: true, sm: false })
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [requestIsLoading, setRequestIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({} as UserProfile)
  const [userIds, setUserIds] = useState<string[]>([])
  const toast = useToast()
  const { user } = useContext(AuthContext)

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

  async function fetchUsers(pageParam: number): Promise<ResponseTable<User>> {
    const { data } = await api.post('user/Filter', {
      page: pageParam,
      pageSize: pageSize
    })
    return data
  }

  const mutation = useMutation(
    async () => {
      return await await api
        .post('User/Points', {
          userIds,
          points: valueAsNumber
        })
        .catch(function (error) {
          if (error.response) {
            throw error.response.data
          }
        })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('usersPoints')
      }
    }
  )

  const onSubmit = async () => {
    if (userIds.length === 0) {
      toast({
        title: 'Nenhum usuario foi marcardo',
        description: 'Marque um usuarios para alterar a pontuação',
        status: 'info'
      })
      return
    }

    setRequestIsLoading(true)
    try {
      await mutation.mutateAsync()
      toast({
        title: 'Pontos atualizados',
        description: 'Os posntos foram atualizados com sucesso',
        status: 'success'
      })
      setRequestIsLoading(false)
    } catch (exception) {
      toast({
        title: 'Falha ao atualizar',
        description: exception,
        status: 'error'
      })
      setRequestIsLoading(false)
    }
  }

  const { data, isLoading, isError, isFetching } = useQuery(
    ['usersPoints', page],
    () => fetchUsers(page),
    { keepPreviousData: true, staleTime: 1000 * 60 }
  )

  function checkUser(userId: string, e) {
    const usersCheckd = userIds
    if (e.target.checked) {
      usersCheckd.push(userId)
      setUserIds(usersCheckd)
    } else {
      const index = usersCheckd.findIndex(e => e === userId)
      usersCheckd.splice(index, 1)
      setUserIds(usersCheckd)
    }
  }

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber
  } = useNumberInput({
    step: 5,
    defaultValue: 0,
    min: -999,
    max: 999
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  if (isLoading && !isError) {
    return <Loading />
  }

  if (!isLoading && isError) {
    return <Error />
  }

  return (
    <LayoutDashboard profile={userProfile}>
      <Box>
        <Flex
          justify="space-between"
          direction={windowSmall ? 'column' : 'row'}
          align="center"
        >
          <Flex align="center" width={windowSmall ? '100%' : 60}>
            <Search />
            {!isLoading && isFetching && (
              <Spinner ml={4} size="sm" colorScheme="gray" />
            )}
          </Flex>
          <Flex mt={windowSmall ? 4 : 0}>
            <Flex
              maxW="320px"
              border="1px solid"
              borderColor="gray.800"
              borderRadius={8}
            >
              <Button borderRightRadius={0} {...dec}>
                <Icon as={FiMinus} />
              </Button>
              <ChakraInput
                w={20}
                textAlign="center"
                borderRadius={0}
                border={0}
                _focus={{
                  outline: 'none'
                }}
                {...input}
              />
              <Button borderLeftRadius={0} {...inc}>
                <Icon as={FiPlus} />
              </Button>
            </Flex>
            <Button ml={4} onClick={onSubmit} isLoading={requestIsLoading}>
              Aplicar
            </Button>
          </Flex>
        </Flex>
        <Table fontSize={windowSmall ? 12 : 16}>
          <Thead>
            <Tr>
              <Th fontSize={windowSmall ? 12 : 16}>Usuário</Th>
              <Th fontSize={windowSmall ? 12 : 16} w={10}>
                Pontos
              </Th>
              <Th fontSize={windowSmall ? 12 : 16} w={10}>
                Posição
              </Th>
              <Th fontSize={windowSmall ? 12 : 16} w={20}>
                Ações
              </Th>
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
                      name={user.name + ' ' + user.surname}
                      mr={4}
                      display={windowSmall ? 'none' : 'flex'}
                    />
                    {user.name + ' ' + user.surname}
                  </Flex>
                </Td>
                <Td textAlign="center">{user.points}</Td>
                <Td textAlign="center">
                  <Tooltip label={user.position.name}>
                    {user.position.shortName}
                  </Tooltip>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Checkbox
                      iconSize="lg"
                      size="lg"
                      onChange={e => checkUser(user.id, e)}
                    ></Checkbox>
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
