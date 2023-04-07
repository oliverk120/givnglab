// utils/dataUtils.ts

import type { Gift } from '../types/gift';

// Function to identify duplicates and missing values
export const identifyIssues = (data: Gift[]) => {
  const hasMissingValues = (obj: any) => Object.values(obj).some((val) => val === null || val === '');

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

  return { duplicateItems, itemsWithMissingValues };
};