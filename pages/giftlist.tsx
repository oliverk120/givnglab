import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GiftList from '../components/GiftList';
import { Gift } from '../types/gift';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

type GiftListPageProps = {
  allGifts: Gift[];
};

const GiftListPage: React.FC<GiftListPageProps> = ({ allGifts }) => {
  const router = useRouter();
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const priceRange = router.query.priceRange as string;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    // Filter gifts based on the selected price range
    const giftsInRange = allGifts.filter((gift) => {
      const price = Number(gift.price);
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredGifts(giftsInRange);
  }, [router.query.priceRange, allGifts]);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Slice the array to get the gifts for the current page
  const giftsToDisplay = filteredGifts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box>
      <Heading as="h1" size="2xl" mb={6}>
      </Heading>
      <GiftList giftList={giftsToDisplay} />
      <Flex mt={6} justifyContent="center">
        {currentPage > 1 && (
          <Button onClick={() => handlePageChange(currentPage - 1)} mr={2}>
            Previous
          </Button>
        )}
        {currentPage * itemsPerPage < filteredGifts.length && (
          <Button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        )}
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
  const allGifts = result.data as Gift[];

  // Pass the parsed data as props to the page component
  return {
    props: {
      allGifts,
    },
  };
}

export default GiftListPage;
