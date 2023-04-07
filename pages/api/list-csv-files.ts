// pages/api/list-csv-files.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Define the directory where CSV files are located
    const csvDirectory = path.join(process.cwd(), 'public', 'csv-files');

    // Read the directory and filter CSV files
    const csvFiles = fs.readdirSync(csvDirectory).filter((file) => file.endsWith('.csv'));

    // Return the list of CSV files as JSON
    res.status(200).json(csvFiles);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
