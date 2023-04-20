// components/GiftsTable.tsx
import React, { useState, useEffect } from 'react';
import { Gift } from '../types/gift';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import TruncatedText from './TruncatedText';
import { saveGiftsToCsv } from '../utils/csvUtils';

type GiftsTableProps = {
  tableData: Gift[];
  selectedCsvFile: string;
  isEditable?: boolean;
  onTableDataChange: (newTableData: Gift[]) => void;
};

const GiftsTable: React.FC<GiftsTableProps> = ({
  tableData,
  selectedCsvFile,
  isEditable,
  onTableDataChange,
}) => {
  const [cleanedGiftList, setCleanedGiftList] = useState<Gift[]>(tableData || []);
  const [editingCell, setEditingCell] = useState<{ id: string; key: keyof Gift } | null>(null);
    // State to keep track of selected gifts for deletion
    const [selectedGiftIds, setSelectedGiftIds] = useState<Set<string>>(new Set());

    // Function to handle checking/unchecking individual gift checkboxes
    const handleGiftCheck = (giftId: string, isChecked: boolean) => {
      setSelectedGiftIds((prevSelectedGiftIds) => {
        const newSelectedGiftIds = new Set(prevSelectedGiftIds);
        if (isChecked) {
          newSelectedGiftIds.add(giftId);
        } else {
          newSelectedGiftIds.delete(giftId);
        }
        return newSelectedGiftIds;
      });
    };


      // Use the useEffect hook to log changes to selectedGiftIds
  useEffect(() => {
    console.log("Updated selected gift IDs:", Array.from(selectedGiftIds));
  }, [selectedGiftIds]);

  // Function to handle checking/unchecking the select-all checkbox
  const handleSelectAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      // Select only the gifts that are currently displayed in the table
      const displayedGiftIds = new Set(tableData.map((gift) => gift.id));
      setSelectedGiftIds(displayedGiftIds);
    } else {
      setSelectedGiftIds(new Set());
    }
    console.log("Selected gift IDs after select all:", Array.from(selectedGiftIds));
  };
  const handleDeleteSelected = () => {
    // Create an array of gifts to be deleted based on the selected gift IDs
    const giftsToBeDeleted = tableData.filter((gift) => selectedGiftIds.has(gift.id));
  
    // Call the onTableDataChange prop with the gifts to be deleted
    onTableDataChange(giftsToBeDeleted);
  
    // Clear the selectedGiftIds state
    setSelectedGiftIds(new Set());
  };



  // Function to delete a specific gift
  const handleDeleteGift = (giftId: string) => {
    const newTableData = tableData.filter((gift) => gift.id !== giftId);
    onTableDataChange(newTableData);
  };

  // Synchronize the cleanedGiftList state with the tableData prop
  useEffect(() => {
    setCleanedGiftList(tableData);
  }, [tableData]);

  const handleCellClick = (id: string, key: keyof Gift) => {
    setEditingCell({ id, key });
  };

  const handleCellBlur = (
    event: React.FocusEvent<HTMLTableDataCellElement>,
    id: string,
    key: keyof Gift
  ) => {
    const newValue = event.target.textContent || '';
    setCleanedGiftList((prevGiftList) => {
      const updatedGiftList = [...prevGiftList];
      const giftIndex = updatedGiftList.findIndex((gift) => gift.id === id);
      if (giftIndex >= 0) {
        if (key === 'metadata' || key === 'enrichedData') {
          try {
            updatedGiftList[giftIndex][key] = JSON.parse(newValue);
          } catch (error) {
            console.error('Invalid JSON format:', error);
          }
        } else {
          updatedGiftList[giftIndex][key] = newValue;
        }
      }
      // Notify parent component of the updated table data
      onTableDataChange(updatedGiftList);
      return updatedGiftList;
    });
    setEditingCell(null);
  };

const handleSaveCsv = () => {
  if (window.confirm("Are you sure you're ready to save?")) {
    saveGiftsToCsv(cleanedGiftList, selectedCsvFile);
  }
};

return (
    <Table variant="simple">
      <Thead>
        {/* Admin panel only visible if editable */}
        {isEditable && (
        <Tr>
          {/* Checkbox to select all */}
          {isEditable && (
            <Th>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAllCheck(e.target.checked)}
              />
            </Th>
          )}
                    {/* Delete Selected button */}
          {isEditable && (
            
              
                <Td colSpan={8} textAlign="right">
                <Button colorScheme="red" onClick={() => handleDeleteSelected()}>
                  Delete Selected
                </Button>
                </Td>
              
          
          )}
          <Th colSpan={8} textAlign="right">
            {/* Save Data button in the admin panel */}
            <Button colorScheme="blue" onClick={handleSaveCsv}>
              Save Data
            </Button>
          </Th>
        </Tr>
        
      )}

        <Tr>
          {isEditable && (<Th>Select</Th>)}
          <Th>Name</Th>
          <Th>Image URL</Th>
          <Th>Brand</Th>
          <Th>Product Source URL</Th>
          <Th>Description</Th>
          <Th>Price</Th>
          <Th>Metadata</Th>
          <Th>Enriched Data</Th>
        </Tr>
      </Thead>
      <Tbody>
          {tableData.map((item, index) => (
                <Tr key={index}>
                              {isEditable && (
              <Td>
                <input
                  type="checkbox"
                  checked={selectedGiftIds.has(item.id)}
                  onChange={(e) => handleGiftCheck(item.id, e.target.checked)}
                />
              </Td>
            )}
                  {/* Delete Selected button */}

                  <Td
                  contentEditable={editingCell?.id === item.id && editingCell?.key === 'name'}
                  onBlur={(e) => handleCellBlur?.(e, item.id, 'name')}
                  onClick={() => handleCellClick?.(item.id, 'name')}
                  bg={item.name === '' ? 'yellow' : ''}
                >
                  <TruncatedText text={item.name} maxLength = {200} />
                </Td>

                <Td
                    contentEditable={isEditable && editingCell?.id === item.id && editingCell?.key === 'image_url'}
                    onBlur={isEditable ? (e) => handleCellBlur?.(e, item.id, 'image_url') : undefined}
                    onClick={isEditable ? () => handleCellClick?.(item.id, 'image_url') : undefined}
                    bg={item.image_url === '' ? 'yellow' : ''}
                    >
                    {/* Check if the cell is in edit mode */}
                    {isEditable && editingCell?.id === item.id && editingCell?.key === 'image_url' ? (
                        // In edit mode: display the truncated URL
                        <TruncatedText text={item.image_url} maxLength = {20} />
                    ) : (
                        // In non-edit mode: render the image (if the image URL exists)
                        item.image_url && (
                        <Image
                            src={item.image_url}
                            alt="Gift"
                            boxSize="80px" // Set the size of the image (modify as needed)
                        />
                        )
                    )}
                </Td>
                <Td
                  contentEditable={editingCell?.id === item.id && editingCell?.key === 'brand'}
                  onBlur={(e) => handleCellBlur?.(e, item.id, 'brand')}
                  onClick={() => handleCellClick?.(item.id, 'brand')}
                  bg={item.brand === '' ? 'yellow' : ''}
                >
                  <TruncatedText text={item.brand} maxLength={100} />
                </Td>
                <Td
                  contentEditable={editingCell?.id === item.id && editingCell?.key === 'product_source_url'}
                  onBlur={(e) => handleCellBlur?.(e, item.id, 'product_source_url')}
                  onClick={() => handleCellClick?.(item.id, 'product_source_url')}
                  bg={item.product_source_url === '' ? 'yellow' : ''}
                >
                <TruncatedText text={item.product_source_url} maxLength={20} />
              </Td>
              <Td
                contentEditable={editingCell?.id === item.id && editingCell?.key === 'description'}
                onBlur={(e) => handleCellBlur?.(e, item.id, 'description')}
                onClick={() => handleCellClick?.(item.id, 'description')}
                bg={item.description === '' ? 'yellow' : ''}
              >
                <TruncatedText text={item.description} maxLength={20} />
              </Td>
              <Td
                contentEditable={editingCell?.id === item.id && editingCell?.key === 'price'}
                onBlur={(e) => handleCellBlur?.(e, item.id, 'price')}
                onClick={() => handleCellClick?.(item.id, 'price')}
                bg={(item.price === '' || isNaN(Number(item.price))) ? 'yellow' : ''}
              >
                <TruncatedText text={item.price} maxLength={20} />
              </Td>
              <Td
                contentEditable={editingCell?.id === item.id && editingCell?.key === 'metadata'}
                onBlur={(e) => handleCellBlur?.(e, item.id, 'metadata')}
                onClick={() => handleCellClick?.(item.id, 'metadata')}
                bg={item.metadata ? '' : 'yellow'}
                >
                <TruncatedText text={JSON.stringify(item.metadata) || ''} maxLength={50} />
                </Td>

                {/* EnrichedData as JSON */}
                <Td
                contentEditable={editingCell?.id === item.id && editingCell?.key === 'enrichedData'}
                onBlur={(e) => handleCellBlur?.(e, item.id, 'enrichedData')}
                onClick={() => handleCellClick?.(item.id, 'enrichedData')}
                bg={item.enrichedData ? '' : 'yellow'}
                >
                <TruncatedText text={JSON.stringify(item.enrichedData) || ''} maxLength={50} />
                </Td>
                {/* Delete button for each gift */}
            {isEditable && (
              <Td>
                <Button onClick={() => handleDeleteGift(item.id)}>Delete</Button>
              </Td>
              )}
            </Tr>  
          ))}
        </Tbody>
    </Table>
  );
};

export default GiftsTable;
