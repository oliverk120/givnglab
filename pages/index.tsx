// pages/index.tsx
import { Box, Heading, Text, Image, VStack, Select, Button, Center, FormControl } from '@chakra-ui/react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to the giftlist page with the selected price range as a query parameter
    router.push(`/giftlist?priceRange=${priceRange}`);
  };  

  return (
    <>
      <Navbar showLogo={false} transparentBg={true} />
      <Box maxW="container.xl" mx="auto" p={4} textAlign="center">
        {/* Center the Logo and Project Name */}
        <Center>
          <VStack>
            <Image src="/logo-bg.png" alt="Logo" boxSize="150px" />
            <Heading as="h1" size="2xl" mb={4}>
              GivngLab
            </Heading>
          </VStack>
        </Center>

        {/* Welcome Text */}
        <Text fontSize="xl" mb={6}>
          Welcome to GivngLab. I would like a gift for
        </Text>

        {/* Form */}
        <form onSubmit={handleSubmit}>
      <VStack spacing={4} width="300px" mx="auto">
        {/* ... (existing code) ... */}
        {/* Price Range Selection */}
        <FormControl isRequired>
          <Select
            placeholder="Price Range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="1-20">$1 - $20</option>
            <option value="20-50">$20 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            {/* Add more price ranges here */}
          </Select>
        </FormControl>
        {/* Submit Button */}
        <Button colorScheme="teal" type="submit">
          Find Gifts
        </Button>
      </VStack>
    </form>
      </Box>
    </>
  );
};

export default Home;
