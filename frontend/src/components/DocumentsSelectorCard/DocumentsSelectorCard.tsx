import { DocumentCreatorContext } from '@/utils/context/DocumentCreatorContext';
import { Grid, GridItem, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import { HiOutlineDocumentText } from 'react-icons/hi';

const DocumentsSelectorCard = () => {
  const documentCreatorContext = useContext(DocumentCreatorContext);
  const [document, setDocument] = useState(documentCreatorContext.documentType);

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      maxW="xl"
      mx="auto"
      textAlign="center"
    >
      <GridItem
        w="100%"
        px={6}
        py={12}
        rounded="lg"
        shadow="sm"
        justifyContent="center"
        alignItems="center"
        bg="gray.700"
        border="1px solid"
        borderColor={
          document === 'covering-letter' ? 'teal.300' : 'transparent'
        }
        transition="all 0.2s ease"
        _hover={{
          border: '1px solid',
          borderColor: 'teal.300',
        }}
        cursor="pointer"
        onClick={() => {
          documentCreatorContext.setDocumentType('covering-letter');
          setDocument('covering-letter');
        }}
      >
        <Stack align="center">
          <Icon as={HiOutlineDocumentText} fontSize={64} />
          <Heading as="h3" fontSize="3xl">
            Covering Letter
          </Heading>
          <Text>Select Covering Letter Document</Text>
        </Stack>
      </GridItem>
      <GridItem
        w="100%"
        px={6}
        py={12}
        rounded="lg"
        shadow="sm"
        justifyContent="center"
        alignItems="center"
        bg="gray.700"
        border="1px solid"
        borderColor={document === 'bill-of-lading' ? 'teal.300' : 'transparent'}
        transition="all 0.2s ease"
        _hover={{
          border: '1px solid',
          borderColor: 'teal.300',
        }}
        cursor="pointer"
        onClick={() => {
          documentCreatorContext.setDocumentType('bill-of-lading');
          setDocument('bill-of-lading');
        }}
      >
        <Stack align="center">
          <Icon as={HiOutlineDocumentText} fontSize={64} />
          <Heading as="h3" fontSize="3xl">
            Bill of Lading
          </Heading>
          <Text>Select Bill of Lading Document</Text>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default DocumentsSelectorCard;
