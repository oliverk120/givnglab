// pages/preprocess.tsx
import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  VStack,
  Button,
  Alert,
  Box,
  Textarea,
  Select,
} from '@chakra-ui/react';
import CleanData from '../components/CleanData';
import { identifyIssues } from '../utils/dataUtils'; 
import type { Gift } from '../types/gift';


const Preprocess: React.FC = () => {
    const [loadedGiftList, setLoadedGiftList] = useState<Gift[]>([]);
    const [csvFiles, setCsvFiles] = useState<string[]>([]);
    const [selectedCsvFile, setSelectedCsvFile] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
      // Define state variables for duplicates and missing values
    const [duplicates, setDuplicates] = useState<Gift[]>([]);
    const [missingValues, setMissingValues] = useState<Gift[]>([]);
    const [itemsWithNonNumericPrice, setItemsWithNonNumericPrice] = useState<Gift[]>([]);

  // Fetch the list of available CSV files
  useEffect(() => {
    console.log("fetchCsvFiles is running"); // Log a message to the console
    const fetchCsvFiles = async () => {
      try {
        const response = await fetch('/api/list-csv-files');
        const files = await response.json();
        if (Array.isArray(files)) {
          setCsvFiles(files);
          if (files.length > 0) {
            setSelectedCsvFile(files[0]);
          }
        } else {
          setError('Failed to load CSV files. Invalid response format.');
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchCsvFiles();
  }, []);

  // Function to load and preprocess CSV data
  const handlePreprocess = async () => {
    try {
      // Fetch the preprocessed data from the API for the selected CSV file
      const response = await fetch(`/api/load?csvFile=${encodeURIComponent(selectedCsvFile)}`);

      // Check if the response status is OK (status code 200)
      if (!response.ok) {
        // Get the error message from the response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load CSV data');
      }

      // Parse the JSON data from the response
      const preprocessedData = await response.json();

      // Update the state with the preprocessed data
      setLoadedGiftList(preprocessedData);
      console.log('Preprocessed data:', preprocessedData); // Debug: Log the preprocessed data
      setError(null);

      // Call identifyIssues function to identify duplicates, items with missing values, and non-numeric prices
      const { duplicateItems, itemsWithMissingValues, itemsWithNonNumericPrice } = identifyIssues(preprocessedData);

      // Update the state with duplicates, items with missing values, and items with non-numeric prices
      setDuplicates(duplicateItems);
      setMissingValues(itemsWithMissingValues);
      setItemsWithNonNumericPrice(itemsWithNonNumericPrice);


    } catch (error) {
      // Use a type assertion to specify that 'error' is of type 'Error'
      const errorMessage = (error as Error).message;

      // Set the error message in the state
      setError(errorMessage);
    }
  };

  return (
    <>
      <VStack spacing={4}>
        {/* Add the FormControl with the FormLabel and Select */}
        <FormControl width="200px">
          <FormLabel>Select CSV File</FormLabel>
          <Select value={selectedCsvFile} onChange={(e) => setSelectedCsvFile(e.target.value)}>
            {csvFiles.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handlePreprocess}>Load and Preprocess CSV Data</Button>
        {error && <Alert status="error">{error}</Alert>}
        <Box>
          <Textarea
            value={JSON.stringify(loadedGiftList, null, 2)}
            readOnly
            height="400px"
            width="800px"
          />
        </Box>
      </VStack>
      <CleanData
      giftList={loadedGiftList}
      duplicates={duplicates}
      missingValues={missingValues}
      itemsWithNonNumericPrice={itemsWithNonNumericPrice} // Pass the prop
    />
    </>
  );
};

export default Preprocess;