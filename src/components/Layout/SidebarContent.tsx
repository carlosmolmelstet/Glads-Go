import { BoxProps, Flex, Stack, CloseButton, Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { IconType } from "react-icons";
import { FiUsers, FiSettings, FiStar, FiLayout } from "react-icons/fi";
import { MdOutlineEmojiEvents } from "react-icons/md";

import Logo from "./Logo";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Usuarios', icon: FiUsers, route: "/users" },
  { name: 'Ranking', icon: MdOutlineEmojiEvents, route: "/ranking" },
  { name: 'Pontos', icon: FiLayout, route: "/points" },
  { name: 'Configurações', icon: FiSettings, route: "/settings" },
];

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const router = useRouter();


  return (
    <Box
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Stack spacing={1}>
        {LinkItems.map((link) => (
            <NavItem onClick={onClose} mx="4" key={link.name} route={link.route} icon={link.icon} isActive={router.pathname == link.route ? true : false}>
              {link.name}
            </NavItem>
        ))}
      </Stack>
    </Box>
  );
};
