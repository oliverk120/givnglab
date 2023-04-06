import { Box, Button, Heading, VStack } from '@chakra-ui/react';

const ChakraTest = () => {
  return (
    <VStack spacing={4} p={4} alignItems="center">
      <Heading as="h1" size="2xl" color="teal.500">
        Chakra UI Test
      </Heading>
      <Box borderRadius="md" bg="teal.500" p={4} color="white">
        This is a Chakra Box
      </Box>
      <Button colorScheme="teal" size="lg">
        Chakra Button
      </Button>
    </VStack>
  );
};

export default ChakraTest;
