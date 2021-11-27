import React, { Dispatch, SetStateAction } from 'react';
import { Button, Flex, forwardRef, useColorModeValue,} from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';

interface TablePaginationProps {
    total: number;
    pageSize?: number;
    changePage: Dispatch<SetStateAction<number>>;
}

export function TablePagination({ total, pageSize = 10, changePage, ...rest }: TablePaginationProps) {
    
    const Prev = forwardRef(() => <></>);
    const Next = forwardRef(() => <></>);
    const More = forwardRef((props, ref) => (
        <Button ref={ref} {...props}>
            ...
        </Button>
    ));

    const itemRender = (_, type) => {
        if (type === "prev") {
            return Prev;
        }
        if (type === "next") {
            return Next;
        }
        if (type === "backward" || type === "forward") {
            return More;
        }
    };

    return (
        <Flex justify="flex-end" my={4}>
            <Pagination
                defaultCurrent={1}
                total={total}
                rounded="4px"
                baseStyles={{ bg: useColorModeValue("gray.50", "gray.700")}}
                activeStyles={{ bg: useColorModeValue("gray.200", "gray.500")} }
                hoverStyles={{ bg: useColorModeValue("gray.100", "gray.600")} }
                paginationProps={{ display: "flex", mb: 4 }}
                onChange={(page) => { changePage(page) }}
                pageNeighbours={1}
                defaultPageSize={pageSize}
                itemRender={itemRender}
            />
        </Flex>
    );
}