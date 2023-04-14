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
import GiftsTable from './GiftsTable'; // Import the new GiftsTable component
import { identifyIssues } from '../utils/dataUtils'; // Import identifyIssues function



// Define a type for table categories
type TableCategory = 'all' | 'duplicates' | 'missingValues' | 'nonNumericPrice' | 'withErrors' |null;


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
  const [editingCell, setEditingCell] = useState<{ id: string; key: keyof Gift } | null>(null);

  // Call the identifyIssues function to get the errors
  const { duplicateItems, itemsWithMissingValues, itemsWithNonNumericPrice, totalItemsWithErrors } = identifyIssues(giftList);


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

// Function to save the cleaned data to a new CSV file
const handleSaveCsv = () => {
  if (window.confirm("Are you sure you're ready to save?")) {
    // Convert metadata objects to JSON strings before converting to CSV
    const giftListWithMetadataAsJson = cleanedGiftList.map(gift => {
      const metadataJson = JSON.stringify(gift.metadata);
      return { ...gift, metadata: metadataJson };
    });

    // Convert cleanedGiftList to CSV format
    const csvData = Papa.unparse(giftListWithMetadataAsJson);
    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    // Modify filename to add '-cleaned'
    const newFilename = selectedCsvFile.split('.')[0] + '-cleaned.csv';
    // Trigger a download of the Blob as a CSV file
    saveAs(blob, newFilename);
  }
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
 


  const renderTable = () => {

    let tableData: Gift[] = [];
    switch (tableCategory) {
      case 'all':
        tableData = cleanedGiftList; // You can directly use cleanedGiftList
        break;
      case 'duplicates':
        tableData = duplicateItems; // You can directly use duplicates
        break;
      case 'withErrors':
        tableData = [...duplicateItems, ...itemsWithMissingValues, ...itemsWithNonNumericPrice];
        break;
      case 'missingValues':
        tableData = itemsWithMissingValues; // You can directly use missingValues
        break;
      case 'nonNumericPrice':
        tableData = itemsWithNonNumericPrice; // You can directly use itemsWithNonNumericPrice
        break;
      default:
        break;
    }
    
    const handleCellClick = (id: string, key: keyof Gift) => {
      setEditingCell({ id, key });
    };
  
    const handleCellBlur = (
      event: React.FocusEvent<HTMLTableDataCellElement>,
      id: string,
      key: keyof Gift
    ) => {
      const newValue = event.target.textContent || '';
      setCleanedGiftList((prevGiftList) => {
        const updatedGiftList = [...prevGiftList];
        const giftIndex = updatedGiftList.findIndex((gift) => gift.id === id);
        if (giftIndex >= 0) {
          // If the key is 'metadata' or 'enrichedData', parse the JSON string
          if (key === 'metadata' || key === 'enrichedData') {
            try {
              updatedGiftList[giftIndex][key] = JSON.parse(newValue);
            } catch (error) {
              // Handle JSON parsing error
              console.error('Invalid JSON format:', error);
            }
          } else {
            updatedGiftList[giftIndex][key] = newValue;
          }
        }
        updateCleanedGiftList(updatedGiftList);
        return updatedGiftList;
      });
      setEditingCell(null);
    };

    // Use the GiftsTable component to render the table
    return (
      <GiftsTable
        tableData={tableData}
        handleCellBlur={handleCellBlur}
        handleCellClick={handleCellClick}
        editingCell={editingCell}
      />
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
      </Td>
    </Tr>
  </Tbody>
</Table>
        {/* Save CSV button */}
        <Button onClick={handleSaveCsv} colorScheme="blue">
      Save Cleaned CSV
    </Button>
    {/* Render table */}
    {renderTable()}

    </VStack>
  );
};

export default CleanData;
