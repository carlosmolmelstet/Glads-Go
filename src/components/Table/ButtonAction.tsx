import { Flex, Icon as ChakraIcon, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { ReactNode } from "react";

interface ButtonActionProps {
    children: ReactNode;
    title: string;
    variant: string;
    click: () => void;

}

export function ButtonAction({ children, title, variant, click }: ButtonActionProps) {

    if (variant == "erro") {

    }


    return (
        <Tooltip label={title}>
            <Flex
                justify="center"
                align="center"
                bg={`${variant}.500`}
                opacity={0.7}
                color="white"
                p={2}
                onClick={click}
                borderRadius={4}
                _hover={{
                    opacity: 1,
                    cursor: "pointer",
                    bg: `${variant}.400`
                }}
            >
                {children}
            </Flex>
        </Tooltip>

    );
}