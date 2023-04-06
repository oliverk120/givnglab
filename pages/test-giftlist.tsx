// pages/test-giftlist.tsx
import GiftList from '../components/GiftList';

// Define the type for the gift object
type Gift = {
  name: string;
  image_url: string;
  brand: string;
  product_source_url: string;
  description: string;
  price: string;
  giftsource_url: string;
};

// Dummy data for testing
const dummyGifts: Gift[] = [
  {
    name: 'Gift 1',
    image_url: 'https://example.com/image1.png',
    brand: 'Brand 1',
    product_source_url: 'https://example.com/product1',
    description: 'Description of Gift 1',
    price: '10.00',
    giftsource_url: 'https://example.com/giftsource1',
  },
  {
    name: 'Gift 2',
    image_url: 'https://example.com/image2.png',
    brand: 'Brand 2',
    product_source_url: 'https://example.com/product2',
    description: 'Description of Gift 2',
    price: '20.00',
    giftsource_url: 'https://example.com/giftsource2',
  },
  // Add more dummy gifts here
];

const TestGiftListPage = () => {
  return (
    <div>
      <h1>Test Gift List</h1>
      <GiftList giftList={dummyGifts} />
    </div>
  );
};

export default TestGiftListPage;
