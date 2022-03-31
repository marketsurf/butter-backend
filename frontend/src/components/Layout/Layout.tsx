import { Box, Container } from '@mantine/core';
import React from 'react';
import Header from '../Header';

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/document-creator',
    label: 'Document Creator',
  },
  {
    link: '/verify',
    label: 'Verify your document',
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header links={links} />
      <Box
        component="main"
        sx={{
          marginTop: '50px',
        }}
      >
        <Container>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
