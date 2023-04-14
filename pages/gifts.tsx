import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Box, Heading, Input } from '@chakra-ui/react';
import { Gift } from '../types/gift'; // Import the Gift type
import GiftsTable from '../components/GiftsTable'; // Import the GiftsTable component

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
      {/* Use the GiftsTable component to render the filteredGiftList */}
      <GiftsTable tableData={filteredGiftList} />
    </Box>
  );
};

export async function getStaticProps() {
  // Construct the path to the CSV file
  const csvFilePath = path.join(process.cwd(), 'public/csv-files', 'gq_gifts-cleaned.csv');

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
