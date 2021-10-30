import { Box, Text, Flex, Progress, Stack , Spinner} from '@chakra-ui/react';

export function Loading(): JSX.Element {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      h="70vh"
    >
        <Text fontSize={20} fontWeight="thin">Carregando...</Text>
        <Progress
          mt={4}
          size="xs"
          w={300}
          isIndeterminate
          bgColor="transparent"
          colorScheme="gray"
        />
    </Flex>
  );
}
