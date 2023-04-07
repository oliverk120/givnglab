// components/CleanData.tsx
import React, { useState } from 'react';
import { VStack, Box, Button} from '@chakra-ui/react';
import type { Gift } from '../types/gift';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; // Import Table components from Chakra UI

// Define a type for table categories
type TableCategory = 'all' | 'duplicates' | 'missingValues' | 'nonNumericPrice' | null;


// Define a type for error categories
type ErrorCategory = 'missingValues' | 'duplicates' | 'nonNumericPrice' | null;

const CleanData: React.FC<{
  giftList: Gift[];
  duplicates: Gift[];
  missingValues: Gift[];
  itemsWithNonNumericPrice: Gift[]; // Add this prop
}> = ({ giftList, duplicates, missingValues, itemsWithNonNumericPrice }) => {

  const [cleanedGiftList, setCleanedGiftList] = React.useState<Gift[]>(giftList || []);
  const [selectedErrorCategory, setSelectedErrorCategory] = React.useState<ErrorCategory>(null);
  const [tableCategory, setTableCategory] = useState<TableCategory>(null);

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
 const totalNonNumericPrice = itemsWithNonNumericPrice.length; // Calculate the total non-numeric prices
 

  const renderTable = () => {
    let tableData: Gift[] = [];
    switch (tableCategory) {
      case 'all':
        tableData = cleanedGiftList;
        break;
      case 'duplicates':
        tableData = duplicates;
        break;
      case 'missingValues':
        tableData = missingValues;
        break;
      case 'nonNumericPrice':
        tableData = itemsWithNonNumericPrice;
        break;
      default:
        break;
    }

    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image URL</Th>
            <Th>Brand</Th>
            <Th>Product Source URL</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Gift Source URL</Th>
            <Th>Body Text</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((item, index) => (
            <Tr key={index}>
              <Td bg={item.name === '' ? 'yellow' : ''}>{item.name}</Td>
              <Td bg={item.image_url === '' ? 'yellow' : ''}>{item.image_url}</Td>
              <Td bg={item.brand === '' ? 'yellow' : ''}>{item.brand}</Td>
              <Td bg={item.product_source_url === '' ? 'yellow' : ''}>{item.product_source_url}</Td>
              <Td bg={item.description === '' ? 'yellow' : ''}>{item.description}</Td>
              <Td bg={(item.price === '' || isNaN(Number(item.price))) ? 'yellow' : ''}>{item.price}</Td>
              <Td bg={item.giftsource_url === '' ? 'yellow' : ''}>{item.giftsource_url}</Td>
              <Td bg={item.body_text === '' ? 'yellow' : ''}>{item.body_text}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <VStack spacing={4}>
      {/* Stats box */}
      <Table variant="simple" maxWidth="300px">
  <Tbody>
    <Tr>
      <Td>Total Gifts:</Td>
      <Td>
        <Button onClick={() => setTableCategory('all')} variant="outline">
          {totalGifts}
        </Button>
      </Td>
    </Tr>
    <Tr>
      <Td>Total Duplicates:</Td>
      <Td>
        <Button onClick={() => setTableCategory('duplicates')} variant="outline">
          {totalDuplicates}
        </Button>
      </Td>
    </Tr>
    <Tr>
      <Td>Total Gifts with Missing Values:</Td>
      <Td>
        <Button onClick={() => setTableCategory('missingValues')} variant="outline">
          {totalGiftsWithMissingValues}
        </Button>
      </Td>
    </Tr>
    <Tr>
      <Td>Total Missing Values:</Td>
      <Td>
        <Button onClick={() => setTableCategory('missingValues')} variant="outline">
          {totalMissingValues}
        </Button>
      </Td>
    </Tr>
    <Tr>
      <Td>Total Non-Numeric Prices:</Td>
      <Td>
        <Button onClick={() => setTableCategory('nonNumericPrice')} variant="outline">
          {totalNonNumericPrice}
        </Button>
      </Td>
    </Tr>
  </Tbody>
</Table>
    {/* Render table */}
    {renderTable()}
    </VStack>
  );
};

export default CleanData;
