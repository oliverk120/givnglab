import React, { useState, useEffect } from 'react';
import { Grid, Box, Text, Select, Button } from '@chakra-ui/react';
import { useLoadGifts } from '../hooks/useLoadGifts';
import { identifyIssues } from '../utils/dataUtils';
import type { Gift } from '../types/gift';
import GiftsTable from '../components/GiftsTable';

const Dashboard: React.FC = () => {
  const {
    loadedGiftList,
    setLoadedGiftList,
    csvFiles,
    selectedCsvFile,
    error,
    setSelectedCsvFile,
    handlePreprocess, 
  } = useLoadGifts();

  // State to hold the grouped data
  const [brandsCount, setBrandsCount] = useState<{ [brand: string]: number }>({});
  const [categoriesCount, setCategoriesCount] = useState<{ [category: string]: number }>({});
  const [gendersCount, setGendersCount] = useState<{ [gender: string]: number }>({});
  const [priceBucketsCount, setPriceBucketsCount] = useState<{ [bucket: string]: number }>({});
  const [vibesCount, setVibesCount] = useState<{ [vibe: string]: number }>({});
  const [showAllVibes, setShowAllVibes] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false); 
  
  // State to hold the applied filters
  const [appliedFilters, setAppliedFilters] = useState<{
    categories: string[];
    brands: string[];
    priceBuckets: string[];
    genders: string[];
    vibes: string[]; // Added vibes to the appliedFilters state
  }>({
    categories: [],
    brands: [],
    priceBuckets: [],
    genders: [],
    vibes: [], // Initialize vibes with an empty array
  });

    // Define the handleTableDataChange function
    const handleTableDataChange = () => {
      setLoadedGiftList(filteredGifts);
    };

  // Function to apply or remove a filter
  const handleFilter = (filterType: keyof typeof appliedFilters, filterValue: string) => {
    setAppliedFilters((prevFilters) => {
      const isFilterApplied = prevFilters[filterType].includes(filterValue);
      return {
        ...prevFilters,
        [filterType]: isFilterApplied
          ? prevFilters[filterType].filter((value) => value !== filterValue)
          : [...prevFilters[filterType], filterValue],
      };
    });
  };
    // Clear all filters
    const clearAllFilters = () => {
      setAppliedFilters({
        categories: [],
        brands: [],
        priceBuckets: [],
        genders: [],
        vibes: [],
      });
    };

  // Filter the gifts based on applied filters
  const filteredGifts = loadedGiftList.filter((gift) => {

    // Calculate price bucket based on price
    const price = parseFloat(gift.price || '0');
    const priceBucket = price <= 50 ? '$1 - $50' : price <= 100 ? '$51 - $100' : price <= 200 ? '$101 - $200' : '$200+';

    // Filtering logic
    return (
      (appliedFilters.categories.length === 0 || appliedFilters.categories.includes(gift.enrichedData?.category || '')) &&
      (appliedFilters.brands.length === 0 || appliedFilters.brands.includes(gift.brand || '')) &&
      (appliedFilters.priceBuckets.length === 0 || appliedFilters.priceBuckets.includes(priceBucket)) &&
      (appliedFilters.genders.length === 0 || appliedFilters.genders.includes(gift.metadata?.gender || '')) &&
      (appliedFilters.vibes.length === 0 || (gift.enrichedData?.vibe || '').split(',').some(vibe => appliedFilters.vibes.includes(vibe.trim())))
    );
  });
  console.log(filteredGifts);

  // Group and count data when loadedGiftList is updated
  useEffect(() => {
    const brands: { [brand: string]: number } = {};
    const categories: { [category: string]: number } = {};
    const genders: { [gender: string]: number } = {};
    const priceBuckets: { [bucket: string]: number } = {
      '$1 - $50': 0,
      '$51 - $100': 0,
      '$101 - $200': 0,
      '$200+': 0,
    };
    const vibes: { [vibe: string]: number } = {};

    loadedGiftList.forEach((gift) => {
      // Count brands
      if (gift.brand) {
        brands[gift.brand] = (brands[gift.brand] || 0) + 1;
      }

      // Parse enrichedData and count categories
      const category = gift.enrichedData?.category;
      if (category) {
        categories[category] = (categories[category] || 0) + 1;
      }

      // Parse metadata and count genders
      const gender = gift.metadata?.gender;
      if (gender) {
        genders[gender] = (genders[gender] || 0) + 1;
      }

      // Count price buckets
      const price = parseFloat(gift.price || '0');
      if (price <= 50) {
        priceBuckets['$1 - $50']++;
      } else if (price <= 100) {
        priceBuckets['$51 - $100']++;
      } else if (price <= 200) {
        priceBuckets['$101 - $200']++;
      } else {
        priceBuckets['$200+']++;
      }

      // Parse enrichedData and count vibes
      const vibeString = gift.enrichedData?.vibe;
      if (vibeString) {
        const vibeArray = vibeString.split(',');
        vibeArray.forEach((vibe) => {
          const trimmedVibe = vibe.trim();
          vibes[trimmedVibe] = (vibes[trimmedVibe] || 0) + 1;
        });
      }

      // Log loadedGiftList, categories, and genders for debugging
      console.log('loadedGiftList:', loadedGiftList);
      console.log('categories:', categories);
      console.log('genders:', genders);
      console.log('vibes:', vibes);

    });

    setBrandsCount(brands);
    setCategoriesCount(categories);
    setGendersCount(genders);
    setPriceBucketsCount(priceBuckets);
    setVibesCount(vibes);
  }, [loadedGiftList]);

  // Calculate total gifts and issues
  const totalGifts = loadedGiftList.length;
  const issues = identifyIssues(loadedGiftList);
  const totalIssues = issues.totalItemsWithErrors;

  return (
    <Box>
  {/* CSV File Selection */}
  <Select value={selectedCsvFile} onChange={(e) => setSelectedCsvFile(e.target.value)}>
    {csvFiles.map((file) => (
      <option key={file} value={file}>
        {file}
      </option>
    ))}
  </Select>
  <Button onClick={() => handlePreprocess(selectedCsvFile)}>Load Gifts</Button>
  {error && <Text color="red.500">{error}</Text>}
  {/* Responsive Grid */}
  <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
    {/* First Box: Total Gifts and Issues */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Total Gifts: {totalGifts}</Text>
      <Text fontWeight="bold" color={totalIssues > 0 ? 'red.500' : 'green.500'}>
        Total Issues: {totalIssues}
      </Text>
    </Box>

    {/* Second Box: Top 5 Brands and Show All Button */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Top Brands:</Text>
      {Object.entries(brandsCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, showAllBrands ? undefined : 5)
        .map(([brand, count]) => (
          <Button
            key={brand}
            onClick={() => handleFilter('brands', brand)}
            colorScheme={appliedFilters.brands.includes(brand) ? 'blue' : 'gray'}
          >
            {brand}: {count}
          </Button>
        ))}
      <Button size="sm" onClick={() => setShowAllBrands((prev) => !prev)}>
        {showAllBrands ? 'Show Less' : 'Show All'}
      </Button>
    </Box>

    {/* Third Box: Categories */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Categories:</Text>
      {Object.entries(categoriesCount).map(([category, count]) => (
        <Button
          key={category}
          onClick={() => handleFilter('categories', category)}
          colorScheme={appliedFilters.categories.includes(category) ? 'blue' : 'gray'}
        >
          {category}: {count}
        </Button>
      ))}
    </Box>

    {/* Fourth Box: Genders */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Genders:</Text>
      {Object.entries(gendersCount).map(([gender, count]) => (
        <Button
          key={gender}
          onClick={() => handleFilter('genders', gender)}
          colorScheme={appliedFilters.genders.includes(gender) ? 'blue' : 'gray'}
        >
          {gender}: {count}
        </Button>
      ))}
    </Box>

    {/* Fifth Box: Price Buckets */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Price Buckets:</Text>
      {Object.entries(priceBucketsCount).map(([bucket, count]) => (
        <Button key={bucket} onClick={() => handleFilter('priceBuckets', bucket)} colorScheme={appliedFilters.priceBuckets.includes(bucket) ? 'blue' : 'gray'}>
        {bucket}: {count}
      </Button>
    ))}
  </Box>
  {/* Vibes Box: Top 5 Vibes and Show All Button */}
<Box borderWidth="1px" borderRadius="lg" p={4}>
<Text fontWeight="bold">Vibes:</Text>

{Object.entries(vibesCount)
  .sort(([, a], [, b]) => b - a)
  .slice(0, showAllVibes ? undefined : 5)
  .map(([vibe, count]) => (
    <Button
      key={vibe}
      onClick={() => handleFilter('vibes', vibe)}
      colorScheme={appliedFilters.vibes.includes(vibe) ? 'blue' : 'gray'}
    >
      {vibe}: {count}
    </Button>
  ))}
<Button size="sm" onClick={() => setShowAllVibes((prev) => !prev)}>
  {showAllVibes ? 'Show Less' : 'Show All'}
</Button>
</Box>
{/* Clear All Filters Button */}
<Button
onClick={() => setAppliedFilters({categories: [], brands: [], priceBuckets: [], genders: [], vibes: []})}
colorScheme="red"
>
Clear All Filters
</Button>
</Grid>

<GiftsTable
  tableData={filteredGifts} // Pass the fitered gifts to GiftsTable
  onTableDataChange={handleTableDataChange}
  selectedCsvFile={selectedCsvFile}
  isEditable={true}
/>
</Box>
);
};

export default Dashboard;