import { DocumentCreatorContext } from '@/utils/context/DocumentCreatorContext';
import { Box, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';

const Preview = () => {
  // use context
  const { documentType, pdfUrl } = useContext(DocumentCreatorContext);

  return (
    <Box>
      <Heading>The document type you chose is {documentType}</Heading>
      <Heading>The pdf url you chose is {pdfUrl}</Heading>
    </Box>
  );
};

export default Preview;
