// hooks/useLoadMetadata.ts
import { useState } from 'react';
import Papa from 'papaparse';
import type { Gift } from '../types/gift';

type UseLoadMetadataResult = {
  metadataList: any[];
  handleMetadataFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  matchMetadataToGifts: (giftList: Gift[]) => Gift[];
};

export const useLoadMetadata = (): UseLoadMetadataResult => {
  const [metadataList, setMetadataList] = useState<any[]>([]);

  const handleMetadataFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setMetadataList(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };
  
  const matchMetadataToGifts = (giftList: Gift[]): Gift[] => {
    return giftList.map((gift) => {
      const matchedMetadata = metadataList.find((metadata) => metadata.start_url === gift.giftsource_url);
      return { ...gift, metadata: matchedMetadata };
    });
  };
  
  return {
    metadataList,
    handleMetadataFileUpload,
    matchMetadataToGifts,
  };
};
