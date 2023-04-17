// hooks/useLoadGifts.ts
import { useState, useEffect } from 'react';
import type { Gift } from '../types/gift';

type UseLoadGiftsResult = {
  loadedGiftList: Gift[];
  setLoadedGiftList: (giftList: Gift[]) => void;
  csvFiles: string[];
  selectedCsvFile: string;
  error: string | null;
  setSelectedCsvFile: (csvFile: string) => void;
  handlePreprocess: () => Promise<void>;
  updateCleanedGiftList: (newGiftList: Gift[]) => void;
};

export const useLoadGifts = (): UseLoadGiftsResult => {
  const [loadedGiftList, setLoadedGiftList] = useState<Gift[]>([]);
  const [csvFiles, setCsvFiles] = useState<string[]>([]);
  const [selectedCsvFile, setSelectedCsvFile] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        const response = await fetch('/api/list-csv-files');
        const files = await response.json();
        if (Array.isArray(files)) {
          // Filter the CSV files to only include those with "gift" in the filename
          const filteredFiles = files.filter(file => file.toLowerCase().includes('gift'));
          setCsvFiles(filteredFiles);
          if (filteredFiles.length > 0) {
            setSelectedCsvFile(filteredFiles[0]);
          }
        } else {
          setError('Failed to load CSV files. Invalid response format.');
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchCsvFiles();
  }, []);

  const updateCleanedGiftList = (newGiftList: Gift[]) => {
    setLoadedGiftList(newGiftList);
  };

  const handlePreprocess = async () => {
    try {
      const response = await fetch(`/api/load?csvFile=${encodeURIComponent(selectedCsvFile)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load CSV data');
      }
      const preprocessedData = await response.json();
      setLoadedGiftList(preprocessedData);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    loadedGiftList,
    setLoadedGiftList, // Include this in the return object
    csvFiles,
    selectedCsvFile,
    error,
    setSelectedCsvFile,
    handlePreprocess,
    updateCleanedGiftList,
  };
};
