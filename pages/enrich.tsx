// pages/enrich.tsx
import React, { useState } from 'react';
import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Select,
  Alert,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useLoadGifts } from '../hooks/useLoadGifts';
import Papa from 'papaparse';
import { Gift, EnrichedData } from '../types/gift';
import { saveAs } from 'file-saver';

const Enrich: React.FC = () => {
  const {
    loadedGiftList,
    setLoadedGiftList,
    csvFiles,
    selectedCsvFile,
    error,
    setSelectedCsvFile,
    handlePreprocess,
  } = useLoadGifts();

  const [enrichedData, setEnrichedData] = useState<Gift[]>([]);
  const [examplePrompt, setExamplePrompt] = useState<string | null>(null); // Add new state variable for example prompt

  
  const handleEnrichVibes = async () => {
    // Determine the data to send to the API based on whether enrichedData is empty
    const dataToSend = enrichedData.length > 0 ? enrichedData : loadedGiftList;
  
    // Iterate over each item in dataToSend and parse the metadata field if it is a string
    const giftsToSend = dataToSend.map((gift: Gift) => ({
      ...gift,
      metadata: typeof gift.metadata === 'string' ? JSON.parse(gift.metadata) : gift.metadata,
    }));
  
    // Make a POST request to the Flask API
    const response = await fetch('http://localhost:5000/generate-vibes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gifts: giftsToSend }),
    });
  
    // Parse the response to get the enriched data and example prompt
    const data = await response.json();
    const enrichedGifts = data.map((gift: Gift) => ({
      ...gift,
      enrichedData: {
        ...gift.enrichedData,
        vibe: gift.enrichedData?.vibe,
      },
    }));
  
    setEnrichedData(enrichedGifts);
  };
  
  const handleEnrichCategories = async () => {
    // Determine the data to send to the API based on whether enrichedData is empty
    const dataToSend = enrichedData.length > 0 ? enrichedData : loadedGiftList;
  
    // Iterate over each item in dataToSend and parse the metadata field if it is a string
    const giftsToSend = dataToSend.map((gift: Gift) => ({
      ...gift,
      metadata: typeof gift.metadata === 'string' ? JSON.parse(gift.metadata) : gift.metadata,
    }));
  
    // Make a POST request to the Flask API
    const response = await fetch('http://localhost:5000/generate-categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gifts: giftsToSend }),
    });
  
    // Parse the response to get the enriched data and example prompt
    const data = await response.json();
    const enrichedGifts = data.map((gift: Gift) => ({
      ...gift,
      enrichedData: {
        ...gift.enrichedData,
        category: gift.enrichedData?.category,
      },
    }));
  
    setEnrichedData(enrichedGifts);
  };
  

// Function to save the enriched data to a new CSV file
const handleSaveCsv = () => {
    if (window.confirm("Are you sure you're ready to save?")) {
      // Convert enrichedData and metadata objects to JSON strings before converting to CSV
      const enrichedDataWithJson = enrichedData.map(gift => {
        const enrichedDataJson = JSON.stringify(gift.enrichedData);
        const metadataJson = JSON.stringify(gift.metadata);
        return { ...gift, enrichedData: enrichedDataJson, metadata: metadataJson };
      });
  
      // Convert enrichedData to CSV format
      const csvData = Papa.unparse(enrichedDataWithJson);
      // Create a Blob from the CSV data
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      // Modify filename to add '-enriched'
      const newFilename = selectedCsvFile.split('.')[0] + '-enriched.csv';
      // Trigger a download of the Blob as a CSV file
      saveAs(blob, newFilename);
    }
  };

  return (
    <VStack spacing={4}>
        <FormControl width="200px">
        <FormLabel>Select CSV file with Gifts</FormLabel>
        <Select
          value={selectedCsvFile}
          onChange={(e) => setSelectedCsvFile(e.target.value)}
        >
          {csvFiles.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handlePreprocess}>Load Gifts</Button>
      {error && <Alert status="error">{error}</Alert>}
      <Button onClick={handleEnrichCategories}>Enrich Categories</Button> {/* Button for categories */}
      <Button onClick={handleEnrichVibes}>Enrich Vibes</Button> {/* Button for vibes */}
      <Button onClick={handleSaveCsv} colorScheme="blue">
        Save Enriched CSV
      </Button>
            {/* Display example prompt */}
            {examplePrompt && (
        <Box maxW="container.xl" mx="auto" p={4}>
          <Text fontWeight="bold">Example Prompt:</Text>
          <Text>{examplePrompt}</Text>
        </Box>
      )}
      {/* Render enriched data in a table */}
      <Box maxW="container.xl" mx="auto" p={4}>
        <Table variant="simple" size="lg" width="full">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Gender</Th>
              <Th>Vibe</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(enrichedData.length > 0 ? enrichedData : loadedGiftList).map((gift, index) => (
              <Tr key={index}>
                <Td>{gift.name}</Td>
                <Td>{gift.brand}</Td>
                <Td>{gift.price}</Td>
                <Td>{gift.enrichedData?.category}</Td>
                <Td>{gift.enrichedData?.gender}</Td>
                <Td>{gift.enrichedData?.vibe}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default Enrich;
