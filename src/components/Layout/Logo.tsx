import React from "react";
import { Text } from "@chakra-ui/react";

interface LogoProps {
  hide?: boolean;
}

export default function Logo({hide = false} : LogoProps) {
  return (
    <Text  display={hide ? "none" : "flex"} letterSpacing="0.2rem" fontSize="2rem">
      <Text fontWeight="thin" fontSize="2rem">GLADS</Text>GO
    </Text>
  );
};
