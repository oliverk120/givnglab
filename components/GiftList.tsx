// components/GiftList.tsx
import {
    Box,
    Heading,
    Grid,
    Image,
    Text,
    LinkBox,
    LinkOverlay,
  } from '@chakra-ui/react';
  
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
        <Grid templateColumns="repeat(4, 2fr)" gap={6}>
          {giftList.map((gift) => (
            <LinkBox
              as="article"
              key={gift.name}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Image src={gift.image_url} alt={gift.name} boxSize="200px" />
              <Text fontWeight="bold" fontSize="xl" mt={2}>
                {gift.name}
              </Text>
              <Text>Brand: {gift.brand}</Text>
              <Text>Price: ${gift.price}</Text>
              <LinkOverlay href={gift.product_source_url} isExternal>
                View Product
              </LinkOverlay>
            </LinkBox>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default GiftList;
  