import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import Image from 'next/image';

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

// React component to render the list of gifts
const Gifts: React.FC<{ giftList: Gift[] }> = ({ giftList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the gift list based on the search term
  const filteredGiftList = giftList.filter((gift) =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxW="container.xl" mx="auto" p={4}>
      <Heading as="h1" mb={4} textAlign="center">
        Gifts List
      </Heading>
      <Input
        placeholder="Search for gifts..."
        mb={4}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table variant="simple" size="lg" width="full">
        <Thead bg="gray.100">
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Brand</Th>
            <Th>Product URL</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Gift Source URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredGiftList.map((gift, index) => (
            <Tr key={index}>
              <Td>{gift.name}</Td>
              <Td>
                <Image
                  src={gift.image_url}
                  alt={gift.name}
                  width={100}
                  height={100}
                />
              </Td>
              <Td>{gift.brand}</Td>
              <Td>
                <LinkBox>
                  <LinkOverlay href={gift.product_source_url} isExternal>
                    Link
                  </LinkOverlay>
                </LinkBox>
              </Td>
              <Td>{gift.description}</Td>
              <Td>{gift.price}</Td>
              <Td>
                <LinkBox>
                  <LinkOverlay href={gift.giftsource_url} isExternal>
                    Link
                  </LinkOverlay>
                </LinkBox>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export async function getStaticProps() {
  // Construct the path to the CSV file
  const csvFilePath = path.join(process.cwd(), 'public', 'gq_gifts.csv');

  // Read the CSV file
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  // Parse the CSV data
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  const giftList = result.data as Gift[];

  // Pass the parsed data as props to the page component
  return {
    props: {
      giftList,
    },
  };
}

export default Gifts;
