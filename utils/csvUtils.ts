// utils/csvUtils.ts
import { Gift } from '../types/gift';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const saveGiftsToCsv = (giftList: Gift[], selectedCsvFile: string) => {
  // Convert metadata objects to JSON strings before converting to CSV
  const giftListWithMetadataAsJson = giftList.map(gift => {
    const metadataJson = JSON.stringify(gift.metadata);
    return { ...gift, metadata: metadataJson };
  });

  // Convert giftList to CSV format
  const csvData = Papa.unparse(giftListWithMetadataAsJson);
  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  // Modify filename to add '-cleaned'
  const newFilename = selectedCsvFile.split('.')[0] + '-cleaned.csv';
  // Trigger a download of the Blob as a CSV file
  saveAs(blob, newFilename);
};
