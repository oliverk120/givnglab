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
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>(allGifts); // Initialize with allGifts
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  

  useEffect(() => {
    const priceRange = router.query.priceRange as string;
    const recipient = router.query.recipient as string;
    const vibe = (router.query.vibe as string)?.split(',') || [];
     console.log("allGifts:", allGifts);
    console.log("router.query:", router.query);
    console.log("filteredGifts:", filteredGifts);
    // Filter gifts based on the selected price range
    const giftsInRange = allGifts.filter((gift) => {
      const giftGender = gift.metadata?.gender?.toLowerCase();
      const matchesRecipient = !recipient || giftGender === recipient.toLowerCase() || giftGender === "unisex";
  
      // Check if the gift's vibe matches any of the selected vibes.
      // If no vibes are selected, all gifts pass the vibe filter.
      const giftVibes = gift.enrichedData?.vibe?.split(',')?.map(v => v.trim().toLowerCase());
      const matchesVibe = vibe.length === 0 || vibe.some(v => giftVibes?.includes(v.toLowerCase()));
  
      // Check if the gift's price falls within the selected price range.
      // If no price range is selected, all gifts pass the price filter.
      const giftPrice = parseFloat(gift.price || '0');
      const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(parseFloat) : [0, Infinity];
      const matchesPriceRange = priceRange ? (giftPrice >= minPrice && giftPrice <= maxPrice) : true;
  
      return matchesRecipient && matchesVibe && matchesPriceRange;
    });

    setFilteredGifts(giftsInRange);
  }, [router.query.priceRange, router.query.recipient, router.query.vibe, allGifts]);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Slice the array to get the gifts for the current page
  const giftsToDisplay = filteredGifts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("giftsToDisplay:", filteredGifts);

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
  const csvFilePath = path.join(process.cwd(), 'public/csv-files', 'gq_gifts-cleaned.csv');

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
