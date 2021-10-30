import {
    Button,
    Box,
    Text,
    Flex,
    Input,
    InputLeftElement,
    InputGroup,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { api } from '../services/api';
import { Loading } from '../components/Utils/Loading';
import { Error } from '../components/Utils/Error';
import { FiSearch } from 'react-icons/fi';

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

    console.log(formattedData)
    if (isLoading && !isError) {
        return <Loading />;
    }

    if (!isLoading && isError) {
        return <Error />;
    }

    return (
        <Box>
            <Flex justify="space-between">
                <InputGroup w={200}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch color="gray.300" />}
                    />
                    <Input type="tel" placeholder="Phone number" />
                </InputGroup>
                <Button>Adicionar</Button>
            </Flex>

            <Table variant="simple">
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </Box>
    );
}