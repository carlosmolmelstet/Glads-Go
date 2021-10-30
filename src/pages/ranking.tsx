import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { api } from '../services/api';
import { Loading } from '../components/Utils/Loading';
import { Error } from '../components/Utils/Error';

interface Image {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
}

interface GetImagesResponse {
    after: string;
    data: Image[];
}

export default function Home(): JSX.Element {
    async function fetchImages({ pageParam = null }): Promise<GetImagesResponse> {
        const { data } = await api('/api/images', {
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
    } = useInfiniteQuery('images', fetchImages, {
        getNextPageParam: lastPage => lastPage?.after || null,
    });

    const formattedData = useMemo(() => {
        const formatted = data?.pages.flatMap(imageData => {
            return imageData.data.flat();
        });
        return formatted;
    }, [data]);

    if (true) {
        return <Loading />;
    }

    if (!isLoading && isError) {
        return <Error />;
    }

    return (
            <h1>rank</h1>
    );
}