// components/GiftsTable.tsx
import React from 'react';
import { Gift } from '../types/gift';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react'; // Import the Image component from Chakra UI
import TruncatedText from './TruncatedText'; // Import the TruncatedText component


type GiftsTableProps = {
    tableData: Gift[];
    isEditable?: boolean;
    handleCellBlur?: (
      event: React.FocusEvent<HTMLTableDataCellElement>,
      id: string,
      key: keyof Gift
    ) => void;
    handleCellClick?: (id: string, key: keyof Gift) => void;
    editingCell?: { id: string; key: keyof Gift } | null;
  };

const GiftsTable: React.FC<GiftsTableProps> = ({
    tableData,
    isEditable = false,
    handleCellBlur,
    handleCellClick,
    editingCell,
}) => {
   const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
      };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
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
                        truncateText(item.image_url, 20)
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
            </Tr>
          ))}
        </Tbody>
    </Table>
  );
};

export default GiftsTable;
