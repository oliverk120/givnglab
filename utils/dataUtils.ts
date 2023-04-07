// utils/dataUtils.ts
import type { Gift } from '../types/gift';

// Function to identify duplicates, missing values, and non-numeric prices
export const identifyIssues = (data: Gift[]) => {
  // Helper function to check if an object has any missing values
  const hasMissingValues = (obj: any) => Object.values(obj).some((val) => val === null || val === '');

  // Helper function to check if the price is a numeric value
  const hasNonNumericPrice = (obj: Gift) => isNaN(Number(obj.price));

  // Identify items with non-numeric prices
  const itemsWithNonNumericPrice = data.filter(hasNonNumericPrice);

  // Identify items with missing values
  const itemsWithMissingValues = data.filter(hasMissingValues);

  // Identify duplicate items
  const itemsById = new Map();
  const duplicateItems: Gift[] = [];
  data.forEach((gift) => {
    const key = `${gift.name}-${gift.brand}`;
    if (itemsById.has(key)) {
      duplicateItems.push(gift);
    } else {
      itemsById.set(key, gift);
    }
  });

  return {
    duplicateItems,
    itemsWithMissingValues,
    itemsWithNonNumericPrice, // Include this in the return object
  };
};
