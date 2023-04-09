// components/CleanData.tsx
import React, { useState, useRef } from 'react';
import { VStack, Box, Button} from '@chakra-ui/react';
import type { Gift } from '../types/gift';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; // Import Table components from Chakra UI
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from '@chakra-ui/react';

// Define a type for table categories
type TableCategory = 'all' | 'duplicates' | 'missingValues' | 'nonNumericPrice' | 'withErrors' |null;


// Define a type for error categories
type ErrorCategory = 'missingValues' | 'duplicates' | 'nonNumericPrice' | null;

const CleanData: React.FC<{
  giftList: Gift[];
  duplicates: Gift[];
  missingValues: Gift[];
  itemsWithNonNumericPrice: Gift[];
  totalGiftsWithErrors: number; 
  updateCleanedGiftList: (newGiftList: Gift[]) => void;
  selectedCsvFile: string; 
}> = ({ giftList, duplicates, missingValues, itemsWithNonNumericPrice, totalGiftsWithErrors,updateCleanedGiftList, selectedCsvFile }) => {

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

  // State variable for AlertDialog visibility
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const onCloseAlertDialog = () => setIsAlertDialogOpen(false);
  const onOpenAlertDialog = () => setIsAlertDialogOpen(true);

  const toast = useToast(); // Create a toast instance

  // Remove duplicates from the loaded gift list
  const handleRemoveDuplicates = () => {
    const uniqueGifts = giftList.filter((gift, index, self) =>
      index === self.findIndex((t) => (
        t.name === gift.name && t.image_url === gift.image_url && t.description === gift.description
      ))
    );
    updateCleanedGiftList(uniqueGifts); // Update the gift list in the parent component

    // Show a toast notification
    toast({
      title: "Duplicates removed successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to strip dollar signs and convert non-numeric prices to numbers
const handleStripDollarSigns = () => {
  const cleanedGifts = cleanedGiftList.map((gift) => {
    // Check if the price field contains non-numeric characters
    if (isNaN(Number(gift.price))) {
      // Remove any non-digit characters, including currency symbols
      const cleanedPrice = gift.price.replace(/[^0-9.]/g, '');
      // Convert cleaned price to a number
      const numericPrice = parseFloat(cleanedPrice);
      // If the numeric price is valid, update the gift's price field
      if (!isNaN(numericPrice)) {
        return { ...gift, price: numericPrice.toString() };
      }
    }
    return gift;
  });
  setCleanedGiftList(cleanedGifts);
  updateCleanedGiftList(cleanedGifts); // Update the gift list in the parent component
};

  // Function to save the cleaned data to a new CSV file
  const handleSaveCsv = () => {
    if (window.confirm("Are you sure you're ready to save?")) {
      // Convert cleanedGiftList to CSV format
      const csvData = Papa.unparse(giftList);
      // Create a Blob from the CSV data
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      // Modify filename to add '-cleaned'
      const newFilename = selectedCsvFile.split('.')[0] + '-cleaned.csv'; // Modify this line
      // Trigger a download of the Blob as a CSV file
      saveAs(blob, newFilename);
    }
  };

 // Stats for the stats box
 const totalGifts = cleanedGiftList.length;
 const totalDuplicates = duplicates.length;
 const totalGiftsWithMissingValues = missingValues.length;
 const totalMissingValues = missingValues.reduce((count, item) => {
   return count + Object.values(item).filter((val) => val === null || val === '').length;
 }, 0);
 const totalNonNumericPrice = itemsWithNonNumericPrice.length; // Calculate the total non-numeric prices
   // Create a reference for the "Remove Duplicates" button
   const removeDuplicatesButtonRef = useRef<HTMLButtonElement>(null);
 

  const renderTable = () => {
    let tableData: Gift[] = [];
    switch (tableCategory) {
      case 'all':
        tableData = cleanedGiftList;
        break;
      case 'duplicates':
        tableData = duplicates;
        break;
      case 'withErrors':
        // Combine duplicates, missingValues, and itemsWithNonNumericPrice to get all gifts with errors
        tableData = [...duplicates, ...missingValues, ...itemsWithNonNumericPrice];
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
      <Table variant="simple" maxWidth="800px">
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
      <Td>Total Gifts with Errors:</Td>
      <Td>
        <Button onClick={() => setTableCategory('withErrors')} variant="outline">
          {totalGiftsWithErrors}
        </Button>
      </Td>
    </Tr>
    <Tr>
        <Td>Total Duplicates:</Td>
        <Td>
        <Button onClick={() => setTableCategory('duplicates')} variant="outline" mr={2}>
      {totalDuplicates}
    </Button>
        {/* Add a new button to delete duplicates */}
        <Button colorScheme="red" onClick={handleRemoveDuplicates}>
      Delete Duplicates
    </Button>
          <AlertDialog
            isOpen={isAlertDialogOpen}
            onClose={onCloseAlertDialog}
            leastDestructiveRef={removeDuplicatesButtonRef}
            closeOnEsc={true}
            closeOnOverlayClick={true}
            isCentered={true}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Remove Duplicates
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to remove all duplicate items?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={onCloseAlertDialog}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleRemoveDuplicates} ml={3}>
                    Remove Duplicates
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
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
        <Button colorScheme="blue" onClick={handleStripDollarSigns} ml={3}>
          Strip $ Signs
        </Button>
      </Td>
    </Tr>
  </Tbody>
</Table>
    {/* Render table */}
    {renderTable()}
        {/* Save CSV button */}
        <Button onClick={handleSaveCsv} colorScheme="blue">
      Save Cleaned CSV
    </Button>
    </VStack>
  );
};

export default CleanData;
