import { Card, Group, SimpleGrid } from '@mantine/core';
import React from 'react';
import { FileDescription, FileDollar, FileSettings } from 'tabler-icons-react';
import DocumentTypeCard from './DocumentTypeCard';

const documents = [
  { title: 'Covering Letter', icon: FileDescription, color: 'white' },
  { title: 'Bill Of Lading', icon: FileDollar, color: 'white' },
  { title: 'Own Configuration', icon: FileSettings, color: 'white' },
];

const DocumentTypeSelectionContainer = () => {
  return (
    <Group grow spacing="xl" position="center" m={50}>
      {documents.map((document) => (
        <DocumentTypeCard key={document.title} document={document} />
      ))}
    </Group>
  );
};

export default DocumentTypeSelectionContainer;
