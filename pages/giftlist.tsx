import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GiftList from '../components/GiftList';
import { Gift } from '../types/gift';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useLoadGifts } from '../hooks/useLoadGifts';

const GiftListPage: React.FC = () => { // Remove allGifts prop
  const router = useRouter();
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([]); // Initialize with empty array
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Use the useLoadGifts hook to load gifts
  const { isLoading, loadedGiftList, handlePreprocess, error } = useLoadGifts();

  // Separate useEffect for loading data (runs only once on mount)
  useEffect(() => {
    const csvFile = 'gq_gifts-cleaned-metadata-enriched.csv';
    handlePreprocess(csvFile);
  }, []); // Empty dependency array

  // Separate useEffect for filtering (runs when query or loadedGiftList changes)
  useEffect(() => {
    // Skip filtering logic if still loading
    if (isLoading) return;

    // Log the values
    console.log("router.query.priceRange:", router.query.priceRange);
    console.log("router.query.recipient:", router.query.recipient);
    console.log("router.query.vibe:", router.query.vibe);
    console.log("loadedGiftList:", loadedGiftList);
    // Reset currentPage to 1
    setCurrentPage(1);

    const priceRange = router.query.priceRange as string;
    const recipient = router.query.recipient as string;
    const vibeQuery = router.query.vibe as string;
    const vibe = vibeQuery ? vibeQuery.split(',') : [];

    // Filter gifts based on the selected criteria
    const giftsInRange = loadedGiftList.filter((gift) => {
      // Access the gender property from enrichedData or metadata
      const giftGender = gift.metadata?.gender?.toLowerCase();
      const matchesRecipient = !recipient || giftGender === recipient.toLowerCase() || giftGender === "unisex";

      // Access the vibe property from enrichedData
      const giftVibes = gift.enrichedData?.vibe?.split(',')?.map(v => v.trim().toLowerCase());

      // Allow gifts with any vibe if vibe array is empty, otherwise check for matching vibes
      const matchesVibe = vibe.length === 0 || (giftVibes && vibe.some(v => giftVibes.includes(v.toLowerCase())));

      const giftPrice = parseFloat(gift.price || '0');
      const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(parseFloat) : [0, Infinity];
      const matchesPriceRange = priceRange ? (giftPrice >= minPrice && giftPrice <= maxPrice) : true;

      return matchesRecipient && matchesVibe && matchesPriceRange;
    });

    setFilteredGifts(giftsInRange);
  }, [router.query.priceRange, router.query.recipient, router.query.vibe, loadedGiftList]);

  
  if (isLoading) {
    // Render a loading message while data is being loaded
    return <p>Loading...</p>;
  }

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
      {/* Display error message if there is an error */}
      {error && <p>Error: {error}</p>}

      <Heading as="h1" size="2xl" mb={6}></Heading>
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


export default GiftListPage;
