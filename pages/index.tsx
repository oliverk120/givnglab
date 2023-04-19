import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, VStack, Select, Button, Center, FormControl, Wrap, WrapItem, Tag } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { Gift } from '../types/gift'; // Import the Gift type
import { useLoadGifts } from '../hooks/useLoadGifts'; // Import the useLoadGifts hook


const Home = () => {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState('');
  const [recipient, setRecipient] = useState('');
  const [vibe, setVibe] = useState<string[]>([]);
  const [allGifts, setAllGifts] = useState<Gift[]>([]); // State to hold all gifts



    // Use the useLoadGifts hook to load gifts REMOVE THIS LATER SO THAT GIFTS ARE NOT LOADED ON HOME SCREEN
    const {
      loadedGiftList,
      setSelectedCsvFile,
      handlePreprocess,
    } = useLoadGifts();

    
    useEffect(() => {
      const csvFileName = 'gq_gifts-cleaned-metadata-enriched-sample.csv';
      handlePreprocess(csvFileName)
        .then(() => {
          setAllGifts(loadedGiftList);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    

        // Listen for changes in loadedGiftList and update allGifts
    useEffect(() => {
      setAllGifts(loadedGiftList);
      console.log("loadedGiftList", loadedGiftList); // Add this line to log the updated value
    }, [loadedGiftList]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Redirect to GiftListPage with filter criteria as query parameters
      router.push({
        pathname: '/giftlist', // Change this to the actual path of GiftListPage
        query: {
          priceRange,
          recipient,
          vibe: vibe.join(',') // Convert the array to a comma-separated string
        },
      });
    };
    
  const vibesList = [
    "Luxurious",
    "Cozy",
    "Romantic",
    "Adventurous",
    "Whimsical",
    "Vintage",
    "Minimalist",
    "Eclectic",
    "Zen",
    "Edgy",
    "Artistic",
    "Sporty"
  ];

  const handleVibeClick = (vibeItem: string) => {
    setVibe((prevVibe) => {
      // Toggle selected vibe on/off
      if (prevVibe.includes(vibeItem)) {
        return prevVibe.filter(v => v !== vibeItem);
      } else {
        return [...prevVibe, vibeItem];
      }
    });
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
        <Box fontSize="xl" mb={6}><br />
          I would like a gift for my 
          <Select display="inline-block" width="auto" ml={2} mr={2} value={recipient} onChange={(e) => setRecipient(e.target.value)}>
            <option value="" disabled>Select recipient</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Other</option>
          </Select>
          . Consider the following vibe:
        </Box>

        {/* Vibe Word Cloud */}
        <Wrap justify="center" mb={4}>
          {vibesList.map((vibeItem, index) => (
            <WrapItem key={index}>
              <Tag
                size="lg"
                colorScheme={vibe.includes(vibeItem) ? 'teal' : undefined}
                onClick={() => handleVibeClick(vibeItem)}
                cursor="pointer"
              >
                {vibeItem}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
    {/* Form */}
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} width="300px" mx="auto">
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
        <Button colorScheme="teal" type="submit" isDisabled={!recipient}>
          Find Gifts
        </Button>
      </VStack>
    </form>
  </Box>
</>

);
};

export default Home;