import React from 'react';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

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

// React component to render the list of gifts
const Gifts: React.FC<{ giftList: Gift[] }> = ({ giftList }) => {
  return (
    <div>
      <h1>Gifts List</h1>
      <ul>
        {giftList.map((gift, index) => (
          <li key={index}>
            <div>Name: {gift.name}</div>
            <div><img src={gift.image_url} alt={gift.name} /></div>
            <div>Brand: {gift.brand}</div>
            <div>Product Source URL: <a href={gift.product_source_url}>{gift.product_source_url}</a></div>
            <div>Description: {gift.description}</div>
            <div>Price: {gift.price}</div>
            <div>Gift Source URL: <a href={gift.giftsource_url}>{gift.giftsource_url}</a></div>
          </li>
        ))}
      </ul>
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
  const giftList = result.data as Gift[]; // Add the type assertion here


  // Pass the parsed data as props to the page component
  return {
    props: {
      giftList,
    },
  };
}

export default Gifts;
