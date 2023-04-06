// components/GiftList.tsx
import { Box, Heading, VStack, Image, Text, Link } from '@chakra-ui/react';

// Define the type for the gift object
type Gift = {
  name: string;
  image_url: string;
  brand: string;
  product_source_url: string;
  description: string;
  price: string;
  giftsource_url: string;
};

type GiftListProps = {
  giftList: Gift[];
};

const GiftList: React.FC<GiftListProps> = ({ giftList }) => {
  // No need to filter gifts or use priceRange here

  return (
    <Box maxW="container.xl" mx="auto" p={4}>
      <Heading as="h1" mb={4} textAlign="center">
        Gift List
      </Heading>
      <VStack spacing={4}>
        {giftList.map((gift) => (
          <Box key={gift.name} p={4} borderWidth={1} borderRadius="md">
            <Image src={gift.image_url} alt={gift.name} boxSize="100px" />
            <Text fontWeight="bold">{gift.name}</Text>
            <Text>Brand: {gift.brand}</Text>
            <Text>Price: ${gift.price}</Text>
            <Link href={gift.product_source_url} isExternal>
              View Product
            </Link>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default GiftList;
