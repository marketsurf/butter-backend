import Layout from '@/components/Layout';

import { Box, Container, Flex, Button } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { Step, Steps, useSteps } from 'chakra-ui-steps';
import DocumentsSelectorCard from '@/components/DocumentsSelectorCard';
import Preview from '@/components/Preview';
import FileUploadCard from '@/components/FileUploadCard';
import { useRouter } from 'next/router';

const steps = [
  {
    label: 'Step 1',
    content: <FileUploadCard />,
    description: 'Upload your file',
  },
  {
    label: 'Step 2',
    content: <DocumentsSelectorCard />,
    description: 'Choose the type of document',
  },
  { label: 'Step 3', content: <Preview />, description: 'type' },
];

const Home = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const router = useRouter();

  const handleClick = () => {
    // Redirect to /document-creator
    router.push('/document-creator');
  };

  return (
    <>
      <Box py={8}>
        <Container maxW="7xl">
          <Flex flexDir="column" width="100%">
            <Steps activeStep={activeStep}>
              {steps.map(({ label, content, description }) => (
                <Step label={label} key={label} description={description}>
                  <Box as="main" py="8" flex="1">
                    {content}
                  </Box>
                </Step>
              ))}
            </Steps>
            {activeStep === steps.length ? (
              <Flex p={4}>
                <Button mx="auto" size="sm" onClick={handleClick}>
                  Go to Document Creator
                </Button>
              </Flex>
            ) : (
              <Flex width="100%" justify="flex-end">
                <Button
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="sm"
                  variant="ghost"
                >
                  Prev
                </Button>
                <Button size="sm" onClick={nextStep}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Flex>
            )}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
