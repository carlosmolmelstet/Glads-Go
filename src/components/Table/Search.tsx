import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export function Search() {
    return (
        <InputGroup w="100%">
            <InputLeftElement
                pointerEvents="none"
                color="gray.400"
                children={<FiSearch />}
            />
            <Input type="tel" placeholder="Pesquisar" />
        </InputGroup>
    );
}