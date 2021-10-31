import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Utils/Loading';
import { Error } from '../components/Utils/Error';

interface User {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetUsersResponse {
  after: string;
  data: User[];
}

export default function Home(): JSX.Element {
  async function fetchUsers({ pageParam = null }): Promise<GetUsersResponse> {
    const { data } = await api('/api/users', {
      params: {
        after: pageParam,
      },
    });
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('users', fetchUsers, {
    getNextPageParam: lastPage => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });
    return formatted;
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>

      <Box maxW={1120} px={[10, 15, 20]} mx="auto" my={[10, 15, 20]}>
      </Box>
    </>
  );
}