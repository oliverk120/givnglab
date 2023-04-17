import React, { useState } from 'react';
import { Box, Link } from '@chakra-ui/react';

type TruncatedTextProps = {
  text: string;
  maxLength: number;
};

const TruncatedText: React.FC<TruncatedTextProps> = ({ text = '', maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Box>
      {showFullText ? text : truncateText(text, maxLength)}
      {text.length > maxLength && (
        <Link ml={1} onClick={() => setShowFullText(!showFullText)}>
          {showFullText ? 'Show Less' : 'Show All'}
        </Link>
      )}
    </Box>
  );
};

export default TruncatedText;
