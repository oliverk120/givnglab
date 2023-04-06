import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

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

const Dashboard: React.FC<{ giftList: Gift[] }> = ({ giftList }) => {
  // Calculate statistics
  const numberOfGifts = giftList.length;
  const giftsPerBrand = giftList.reduce<Record<string, number>>((acc, gift) => {
    acc[gift.brand] = (acc[gift.brand] || 0) + 1;
    return acc;
  }, {});

  // State to manage the visibility of brands with only one item
  const [showSingleItemBrands, setShowSingleItemBrands] = useState(false);

  // Filter the brands to display
  const displayedBrands = showSingleItemBrands
    ? giftsPerBrand
    : Object.fromEntries(Object.entries(giftsPerBrand).filter(([, count]) => count > 1));

  // Define price buckets
  const priceBuckets = [
    { label: '$1 - $10', min: 1, max: 10 },
    { label: '$10 - $20', min: 10, max: 20 },
    { label: '$20 - $30', min: 20, max: 30 },
    { label: '$30 - $40', min: 30, max: 40 },
    { label: '$40 - $50', min: 40, max: 50 },
    { label: '$50 - $60', min: 50, max: 60 },
    { label: '$60 - $70', min: 60, max: 70 },
    { label: '$70 - $80', min: 70, max: 80 },
    { label: '$80 - $90', min: 80, max: 90 },
    { label: '$90 - $100', min: 90, max: 100 },
    { label: '$100 - $110', min: 100, max: 110 },
    { label: '$110 - $120', min: 110, max: 120 },
    { label: '$120 - $130', min: 120, max: 130 },
    { label: '$130 - $140', min: 130, max: 140 },
    { label: '$140 - $150', min: 140, max: 150 },
    { label: '$150 - $160', min: 150, max: 160 },
    { label: '$160 - $170', min: 160, max: 170 },
    { label: '$170 - $180', min: 170, max: 180 },
    { label: '$180 - $190', min: 180, max: 190 },
    { label: '$190 - $200', min: 190, max: 200 },
  ];

  // Group the gifts into the specified price buckets and count the number of gifts in each bucket
  const histogramData = priceBuckets.map((bucket) => {
    const count = giftList.filter(
      (gift) => parseFloat(gift.price) >= bucket.min && parseFloat(gift.price) < bucket.max
    ).length;
    return { label: bucket.label, count };
  });

  return (
    <Box maxW="container.xl" mx="auto" p={4}>
      <Heading as="h1" mb={4} textAlign="center">
        Gift Statistics Dashboard
      </Heading>
      <Flex flexDirection={['column', 'row']} alignItems="center">
        <Box flex="1" p={4}>
          <Heading as="h2" size="lg">
            Number of Gifts
          </Heading>
          <Text fontSize="2xl">{numberOfGifts}</Text>
        </Box>
        <Box flex="1" p={4}>
          <Heading as="h2" size="lg">
            Gifts per Brand
          </Heading>
          <VStack align="start" spacing={1}>
            {Object.entries(displayedBrands).map(([brand, count]) => (
              <Text key={brand}>
                {brand}: {count}
              </Text>
            ))}
          </VStack>
          <Button mt={4} onClick={() => setShowSingleItemBrands(!showSingleItemBrands)}>
            {showSingleItemBrands ? 'Hide' : 'Show'} brands with 1 item
          </Button>
        </Box>
        <Box flex="1" p={4}>
          <Heading as="h2" size="lg">
            Histogram of Prices
          </Heading>
          <BarChart width={600} height={300} data={histogramData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="label" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="count" fill="#8884d8" />
</BarChart>
</Box>
</Flex>
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

export default Dashboard;

