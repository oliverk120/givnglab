// pages/api/load.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { Gift } from '../../types/gift';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Read the csvFile query parameter from the request
    const csvFile = req.query.csvFile as string;

    // Construct the path to the specified CSV file using the csvFile query parameter
    const csvFilePath = path.join(process.cwd(), 'public', 'csv-files', csvFile);

    // Check if the CSV file exists
    if (!fs.existsSync(csvFilePath)) {
      res.status(404).json({ message: 'CSV file not found' });
      return;
    }

    // Read the CSV file
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');

    // Parse the CSV data
    const result = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    // Check if the parsed data is valid
    if (!result?.data) {
      res.status(500).json({ message: 'Failed to parse CSV data' });
      return;
    }

    // Parse metadata and enrichedData fields
    const giftList = (result.data as any[]).map((gift) => ({
      ...gift,
      metadata: gift.metadata ? JSON.parse(gift.metadata) : null,
      enrichedData: gift.enrichedData ? JSON.parse(gift.enrichedData) : null,
    })) as Gift[];

    // Preprocess the parsed data (e.g., cleaning, feature extraction)
    // Add preprocessing steps here...

    // Send the preprocessed data as a JSON response
    res.status(200).json(giftList);
  } catch (error) {
    // Use a type assertion to specify that 'error' is of type 'Error'
    const errorMessage = (error as Error).message;

    // Send an error response with the error message
    res.status(500).json({ message: errorMessage });
  }
}

