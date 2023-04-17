import React, { useState, useEffect } from 'react';
import { Grid, Box, Text, Select, Button } from '@chakra-ui/react';
import { useLoadGifts } from '../hooks/useLoadGifts';
import { identifyIssues } from '../utils/dataUtils';
import type { Gift } from '../types/gift';

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

  const [showAllBrands, setShowAllBrands] = useState(false); // State to control the display of all brands

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

  // Log loadedGiftList, categories, and genders for debugging
  console.log('loadedGiftList:', loadedGiftList);
  console.log('categories:', categories);
  console.log('genders:', genders);

    });

    setBrandsCount(brands);
    setCategoriesCount(categories);
    setGendersCount(genders);
    setPriceBucketsCount(priceBuckets);
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
<Button onClick={handlePreprocess}>Load Gifts</Button>
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
          <Text key={brand}>
            {brand}: {count}
          </Text>
        ))}
      <Button size="sm" onClick={() => setShowAllBrands((prev) => !prev)}>
        {showAllBrands ? 'Show Less' : 'Show All'}
      </Button>
    </Box>

    {/* Third Box: Categories */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Categories:</Text>
      {Object.entries(categoriesCount).map(([category, count]) => (
        <Text key={category}>
          {category}: {count}
        </Text>
      ))}
    </Box>

    {/* Fourth Box: Genders */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Genders:</Text>
      {Object.entries(gendersCount).map(([gender, count]) => (
        <Text key={gender}>
          {gender}: {count}
        </Text>
      ))}
    </Box>

    {/* Fifth Box: Price Buckets */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text fontWeight="bold">Price Buckets:</Text>
      {Object.entries(priceBucketsCount).map(([bucket, count]) => (
        <Text key={bucket}>
          {bucket}: {count}
        </Text>
      ))}
    </Box>
  </Grid>
</Box>
);
};

export default Dashboard;