// components/CleanData.tsx
import React, { useState, useRef } from 'react';
import { VStack, Box, Button } from '@chakra-ui/react';
import type { Gift } from '../types/gift';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
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
import GiftsTable from './GiftsTable';
import { identifyIssues } from '../utils/dataUtils';

// Define a type for table categories
type TableCategory = 'all' | 'duplicates' | 'missingValues' | 'nonNumericPrice' | 'withErrors' | null;

// Define a type for error categories
type ErrorCategory = 'missingValues' | 'duplicates' | 'nonNumericPrice' | null;

const CleanData: React.FC<{
  giftList: Gift[];
  updateCleanedGiftList: (newGiftList: Gift[]) => void;
  selectedCsvFile: string;
}> = ({ giftList, updateCleanedGiftList, selectedCsvFile }) => {
  const [cleanedGiftList, setCleanedGiftList] = React.useState<Gift[]>(giftList || []);
  const [selectedErrorCategory, setSelectedErrorCategory] = React.useState<ErrorCategory>(null);
  const [tableCategory, setTableCategory] = useState<TableCategory>(null);

  // Call the identifyIssues function to get the errors
  const { duplicateItems, itemsWithMissingValues, itemsWithNonNumericPrice, totalItemsWithErrors } = identifyIssues(giftList);
  const handleTableDataChange = (newTableData: Gift[]) => {
    setCleanedGiftList(newTableData);
    updateCleanedGiftList(newTableData);
  };

  // Use the useEffect hook to set the cleanedGiftList state
  // whenever the giftList prop changes
  React.useEffect(() => {
    setCleanedGiftList(giftList);
  }, [giftList]);

  // State variable for AlertDialog visibility
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const onCloseAlertDialog = () => setIsAlertDialogOpen(false);
  const onOpenAlertDialog = () => setIsAlertDialogOpen(true);

  const toast = useToast(); // Create a toast instance

  // Remove duplicates from the loaded gift list
  const handleRemoveDuplicates = () => {
    // Calculate the unique gifts by filtering out the duplicate items
    const uniqueGifts = giftList.filter(gift => !duplicateItems.includes(gift));

    // Update the gift list in the parent component
    updateCleanedGiftList(uniqueGifts);

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

const cleanEnrichedData = (gift: Gift) => {
  const { enrichedData } = gift;
  if (enrichedData) {
    // Clean the enrichedData properties by removing unwanted characters
    const cleanedCategory = enrichedData.category?.replace(/[ "']/g, '') || '';
    const cleanedVibe = enrichedData.vibe?.replace(/[ "']/g, '') || '';
    // Update the enrichedData object
    const cleanedEnrichedData = { category: cleanedCategory, vibe: cleanedVibe };
    return { ...gift, enrichedData: cleanedEnrichedData };
  }
  return gift;
};

  // Function to clean enrichedData for all gifts
  const handleCleanEnrichedData = () => {
    const cleanedGifts = cleanedGiftList.map(cleanEnrichedData);
    setCleanedGiftList(cleanedGifts);
    updateCleanedGiftList(cleanedGifts); // Update the gift list in the parent component
  };

// Stats for the stats box
const totalGifts = cleanedGiftList.length;
const totalDuplicates = duplicateItems.length;
const totalGiftsWithMissingValues = itemsWithMissingValues.length;
const totalMissingValues = itemsWithMissingValues.reduce((count, item) => {
return count + Object.values(item).filter((val) => val === null || val === '').length;
}, 0);
const totalNonNumericPrice = itemsWithNonNumericPrice.length; // Calculate the total non-numeric prices

// Create a reference for the "Remove Duplicates" button
const removeDuplicatesButtonRef = useRef<HTMLButtonElement>(null);

return (
<VStack spacing={4}>
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
              {totalItemsWithErrors}
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
            ({totalMissingValues} total missing values)
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
                          {/* Add a new button to clean enrichedData */}
      <Button colorScheme="blue" onClick={handleCleanEnrichedData}>
        Clean Enriched Data
      </Button>
          </Td>
        </Tr>

      </Tbody>
    </Table>

<GiftsTable
     tableData={cleanedGiftList}
     onTableDataChange={handleTableDataChange}
     selectedCsvFile={selectedCsvFile}
     isEditable={true}
   />
</VStack>
);
};

export default CleanData;