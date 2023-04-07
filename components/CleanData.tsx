// components/CleanData.tsx
import React from 'react';
import { VStack, Box, Button, Text, SimpleGrid } from '@chakra-ui/react';
import type { Gift } from '../types/gift';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

// Define a type for error categories
type ErrorCategory = 'missingValues' | 'duplicates' | null;

const CleanData: React.FC<{ giftList: Gift[]; duplicates: Gift[]; missingValues: Gift[] }> = ({
  giftList,
  duplicates,
  missingValues,
}) => {
  const [cleanedGiftList, setCleanedGiftList] = React.useState<Gift[]>(giftList || []);
  const [selectedErrorCategory, setSelectedErrorCategory] = React.useState<ErrorCategory>(null);

  // Use the useEffect hook to set the cleanedGiftList state
  // whenever the giftList prop changes
  React.useEffect(() => {
    setCleanedGiftList(giftList);
  }, [giftList]);

  // Helper function to check if an object has any missing values
  const hasMissingValues = (obj: any) =>
    Object.values(obj).some((val) => val === null || val === '');

  // Render items with errors based on the selected error category
  const renderErrorItems = () => {
    let errorItems: Gift[] = [];
    if (selectedErrorCategory === 'missingValues') {
      errorItems = missingValues;
    } else if (selectedErrorCategory === 'duplicates') {
      errorItems = duplicates;
    }

    return errorItems.map((item, index) => (
      <Box key={index} bg="yellow.200" p={2} borderRadius="md" mt={2}>
        {JSON.stringify(item)}
      </Box>
    ));
  };

  // Function to save the cleaned data to a new CSV file
  const handleSaveCsv = () => {
    // Convert cleanedGiftList to CSV format
    const csvData = Papa.unparse(cleanedGiftList);
    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    // Trigger a download of the Blob as a CSV file
    saveAs(blob, 'cleaned-gifts.csv');
  };

  // Stats for the stats box
  const totalGifts = cleanedGiftList.length;
  const totalDuplicates = duplicates.length;
  const totalGiftsWithMissingValues = missingValues.length;
  const totalMissingValues = missingValues.reduce((count, item) => {
    return count + Object.values(item).filter((val) => val === null || val === '').length;
  }, 0);

  return (
    <VStack spacing={4}>
      {/* Stats box */}
      <Box>
        <Text>Total Gifts: {totalGifts}</Text>
        <Text>Total Duplicates: {totalDuplicates}</Text>
        <Text>Total Gifts with Missing Values: {totalGiftsWithMissingValues}</Text>
        <Text>Total Missing Values: {totalMissingValues}</Text>
      </Box>
      {/* Render items with errors */}
      <Box width="800px">{renderErrorItems()}</Box>
      {/* Button to save cleaned data to a new CSV file */}
      <Button onClick={handleSaveCsv}>Save CSV</Button>
    </VStack>
  );
};

export default CleanData;
