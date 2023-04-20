// components/GiftList.tsx
import {
  Box,
  Heading,
  Grid,
  Image,
  Text,
  Link,
  LinkBox,
  LinkOverlay,
  Divider,
  Tag,
  Flex,
  TagLeftIcon,
} from '@chakra-ui/react';

import type { Gift } from '../types/gift';
import TruncatedText from './TruncatedText';
import { FiTag } from 'react-icons/fi'; // Import FiTag icon from react-icons


type GiftListProps = {
  giftList: Gift[];
};

const GiftList: React.FC<GiftListProps> = ({ giftList }) => {
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
            textAlign="center"
          >
            <Flex flexDirection="column" minHeight="100%">
                        <LinkOverlay href={gift.product_source_url} isExternal>
                        <Box display="flex" justifyContent="center" position="relative">
            <Image src={gift.image_url} alt={gift.name} boxSize="200px" />
            <Tag
                mt={2}
                colorScheme="blue"
                position="absolute"
                bottom={2}
                right={1}
              >
                <TagLeftIcon as={FiTag} /> {/* Price tag icon */}
                ${gift.price}
              </Tag>
            </Box>
            <Heading as="h3" size="md" mt={2}>
              {gift.name}
            </Heading>
            <Text>Brand: {gift.brand}</Text>
            </LinkOverlay>
              {/* Price tag with position: absolute */}
 
            
            <Text fontSize="sm" mt={2} flexGrow={1}>
            <TruncatedText text={gift.description} maxLength = {200} />
            </Text>

            {/* Render metadata section */}
            {gift.metadata && (
              <>
                <Divider mt={4} />
                <Box mt={4} fontSize="sm" color="gray.600">
                  <Text as="span">Gift Suggestion by: </Text>
                  {gift.metadata.source_logo_url && (
                    <Image
                      src={gift.metadata.source_logo_url}
                      alt={gift.metadata.source_name}
                      maxHeight="24px"
                      display="inline-block"
                      mr={1}
                      verticalAlign="middle"
                    />
                  )}
                  <Link href={gift.metadata.start_url} isExternal>
                    {gift.metadata.title}
                  </Link>
                </Box>
              </>
            )}
            </Flex>
          </LinkBox>
        ))}
      </Grid>
    </Box>
  );
};

export default GiftList;
