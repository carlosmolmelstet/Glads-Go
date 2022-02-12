import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
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

export default function Ranking(): JSX.Element {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const [userProfile, setUserProfile] = useState({} as UserProfile)
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

  const { data, isLoading, isError, isFetching } = useQuery(
    ['users', page],
    () => fetchUsers(page),
    { keepPreviousData: true, staleTime: 1000 * 60 }
  )

  function calcRanking(points: number) {
    if (points >= 1200) {
      return 'Ranking 2'
    }

    if (points >= 600) {
      return 'Ranking 2'
    }

    if (points >= 350) {
      return 'Ranking 3'
    }

    if (points >= 150) {
      return 'Ranking 4'
    } else {
      return 'Ranking 5'
    }
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
        <Flex justify="space-between">
          <Flex align="center">
            <Search />
            {!isLoading && isFetching && (
              <Spinner ml={4} size="sm" colorScheme="gray" />
            )}
          </Flex>
        </Flex>
        <Table maxW="100vw" overflow="hidden">
          <Thead>
            <Tr>
              <Th>Usuário</Th>
              <Th w={10}>Posição</Th>
              <Th w={10}>Pontos</Th>
              <Th w="150px" textAlign="center">
                Ranking
              </Th>
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
                <Td textAlign="center">{user.points}</Td>
                <Td textAlign="center">{calcRanking(user.points)}</Td>
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

  return {
    props: {}
  }
}
