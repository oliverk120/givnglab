// pages/preprocess.tsx
import React from 'react';
import {
  FormControl,
  FormLabel,
  VStack,
  Button,
  Alert,
  Box,
  Grid,
  Textarea,
  Select,
  Text,
} from '@chakra-ui/react';
import CleanData from '../components/CleanData';
import { useLoadGifts } from '../hooks/useLoadGifts';
import { useLoadMetadata } from '../hooks/useLoadMetadata'; // Import useLoadMetadata

const Preprocess: React.FC = () => {
  // Use the useLoadGifts hook for gift-related tasks
  const {
    loadedGiftList,
    setLoadedGiftList,
    csvFiles,
    selectedCsvFile,
    error,
    setSelectedCsvFile,
    handlePreprocess,
    updateCleanedGiftList,
  } = useLoadGifts();

  // Use the useLoadMetadata hook for metadata-related tasks
  const {
    metadataList,
    handleMetadataFileUpload,
    matchMetadataToGifts,
  } = useLoadMetadata();

  const handleMatchMetadata = () => {
    const updatedGiftList = matchMetadataToGifts(loadedGiftList);
    setLoadedGiftList(updatedGiftList); // Update the gift list
  };

  return (
    <>
      <VStack spacing={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <VStack>
            <FormControl width="200px">
              <FormLabel>Select CSV file with Gifts</FormLabel>
              <Select value={selectedCsvFile} onChange={(e) => setSelectedCsvFile(e.target.value)}>
                {csvFiles.map((file) => (
                  <option key={file} value={file}>
                    {file}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button onClick={() => handlePreprocess(selectedCsvFile)}>Load Gifts</Button>
            {error && <Alert status="error">{error}</Alert>}
            <Textarea
              value={loadedGiftList.map((item) => item.name).join(', ')}
              readOnly
              height="200px"
              width="400px"
            />
          </VStack>
          <VStack>
                  Select file with meta data to match to gifts
          <input
                type="file"
                onChange={handleMetadataFileUpload}
                accept=".csv"
              />
            <Button onClick={handleMatchMetadata} alignSelf="center">
              Match Metadata to Gifts
            </Button>
            {/* Render a Textarea to display the metadata items */}
            <Textarea
              value={metadataList.map((item) => JSON.stringify(item)).join('\n')}
              readOnly
              height="200px"
              width="400px"
            />
            {/* Display the metadata statistics */}
            <Box mt={4}>
              <Text>Total Metadata Items Loaded: {metadataList.length}</Text>
            </Box>
          </VStack>
        </Grid>
      </VStack>
      <CleanData
        giftList={loadedGiftList}
        updateCleanedGiftList={updateCleanedGiftList}
        selectedCsvFile={selectedCsvFile}
      />
    </>
  );
};

export default Preprocess;
