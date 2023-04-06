// pages/giftlist.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GiftList from '../components/GiftList';
import { Gift } from '../types/gift';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

type GiftListPageProps = {
  allGifts: Gift[];
};

const GiftListPage: React.FC<GiftListPageProps> = ({ allGifts }) => {
  const router = useRouter();
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([]);

  useEffect(() => {
    const priceRange = router.query.priceRange as string;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    // Filter gifts based on the selected price range
    const giftsInRange = allGifts.filter((gift) => {
      const price = Number(gift.price);
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredGifts(giftsInRange);
  }, [router.query.priceRange, allGifts]);

  return (
    <div>
      <h1>Gifts</h1>
      <GiftList giftList={filteredGifts} /> {/* Use the prop name "giftList" */}
    </div>
  );
};

export async function getStaticProps() {
  // Construct the path to the CSV file
  const csvFilePath = path.join(process.cwd(), 'public', 'gq_gifts.csv');

  // Read the CSV file
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  // Parse the CSV data
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  const allGifts = result.data as Gift[];

  // Pass the parsed data as props to the page component
  return {
    props: {
      allGifts,
    },
  };
}

export default GiftListPage;
