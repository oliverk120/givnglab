// utils/csvUtils.ts
import { Gift } from '../types/gift';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const saveGiftsToCsv = (giftList: Gift[], selectedCsvFile: string) => {
  // Convert metadata and enrichedData objects to JSON strings before converting to CSV
  const giftListWithJsonData = giftList.map(gift => {
    const metadataJson = JSON.stringify(gift.metadata);
    const enrichedDataJson = JSON.stringify(gift.enrichedData);
    return { ...gift, metadata: metadataJson, enrichedData: enrichedDataJson };
  });

  // Convert giftList to CSV format
  const csvData = Papa.unparse(giftListWithJsonData);
  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  // Modify filename to add '-cleaned'
  const newFilename = selectedCsvFile.split('.')[0] + '-cleaned.csv';
  // Trigger a download of the Blob as a CSV file
  saveAs(blob, newFilename);
};
