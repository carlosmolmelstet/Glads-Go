import {
    Button,
    Box,
    Flex,
    Input,
    InputLeftElement,
    InputGroup,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Icon,
    Td,
    Avatar,
    useDisclosure,
    useBreakpointValue
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { Loading } from '../components/Utils/Loading';
import { Error } from '../components/Utils/Error';
import { FiSearch } from 'react-icons/fi';
import { ModalAddImage } from '../components/Modal/AddImage';
import User from '../interfaces/users/User';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface GetUsersResponse {
    after: string;
    data: User[];
}

export default function Home(): JSX.Element {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const isSmalTable = useBreakpointValue({ base: false, md: true })

    async function fetchUsers(): Promise<GetUsersResponse> {
        const { data } = await api('/api/users');
        return data;
    }

    const {
        data,
        isLoading,
        isError
    } = useQuery('users', fetchUsers);



    if (isLoading && !isError) {
        return <Loading />;
    }

    if (!isLoading && isError) {
        return <Error />;
    }

    return (
        <Box>
                            <ModalAddImage isOpen={isOpen} onClose={onClose} />

            <Flex justify="space-between">
                <InputGroup w={200}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch color="gray.300" />}
                    />
                    <Input type="tel" placeholder="Phone number" />
                </InputGroup>
                <Button onClick={() => onOpen()}>Adicionar</Button>
            </Flex>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Usuario</Th>
                        <Th w={10}>Posição</Th>
                        {isSmalTable ? (
                            <>
                                <Th>Telefone</Th>
                                <Th>Email</Th>
                            </>
                        ) : <></>}
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.data.map(user => (
                        <Tr key={user.id}>
                            <Td>
                                <Flex align="center">
                                    <Avatar
                                        size={'sm'}
                                        src={user.url}
                                        name={user.name}
                                        mr={4}
                                    />
                                    {user.name}
                                </Flex>
                            </Td>
                            <Td textAlign="center">
                                {user.position}
                            </Td>
                            {isSmalTable ? (
                                <>
                                    <Td>
                                        {user.phone}
                                    </Td>
                                    <Td>
                                        {user.email}
                                    </Td>
                                </>
                            ) : <></>}
                            <Td>
                                <Icon as={FiEdit} />
                                <Icon as={FiTrash2} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

        </Box>
    );
}