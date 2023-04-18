import React, { useState } from 'react';
import { useLoadGifts } from '../hooks/useLoadGifts';
import { Box, Heading, Input, Text, Select, Button  } from '@chakra-ui/react';
import GiftsTable from '../components/GiftsTable';

const Gifts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    loadedGiftList,
    setLoadedGiftList,
    csvFiles,
    selectedCsvFile,
    error,
    setSelectedCsvFile,
    handlePreprocess, 
  } = useLoadGifts();

  // Filter the gift list based on the search term and other filters
  const filteredGiftList = loadedGiftList.filter((gift) => {
    return gift.name.toLowerCase().includes(searchTerm.toLowerCase())
  });

  return (
    <Box maxW="container.xl" mx="auto" p={4}>
      <Heading as="h1" mb={4} textAlign="center">
        Gifts List
      </Heading>
      {/* CSV File Selection */}
      <Select value={selectedCsvFile} onChange={(e) => setSelectedCsvFile(e.target.value)}>
        {csvFiles.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </Select>
      <Button onClick={handlePreprocess}>Load Gifts</Button>
      {error && <Text color="red.500">{error}</Text>}

      {/* Search and Filter Inputs */}
      <Input
        placeholder="Search for gifts..."
        mb={4}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Use the GiftsTable component to render the filteredGiftList */}
      <GiftsTable
        tableData={filteredGiftList}
        selectedCsvFile={selectedCsvFile}
        isEditable={true} // Set to true to enable editing
        onTableDataChange={(newTableData) => setLoadedGiftList(newTableData)}
      />
    </Box>
  );
};

export default Gifts;
