import { DocumentContext } from '@/common/context/document';
import DocumentTypeSelectionContainer from '@/components/DocumentTypeSelectionContainer';
import FileUploadContainer from '@/components/FileUploadContainer';
import Layout from '@/components/Layout';
import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  Stack,
  Stepper,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  previewTitle: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: '2rem',
  },
  previewTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  completedTitle: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  completedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [isDocumentTypeChosen, setIsDocumentTypeChosen] = useState(false);

  const { documentContent, documentType } = useContext(DocumentContext);

  const { classes } = useStyles();

  // TODO: Fix the Next.js SSR issue regarding localStorage
  useEffect(() => {
    setIsDocumentUploaded(documentContent.length > 0);
    setIsDocumentTypeChosen(documentType !== '');
  }, [documentContent.length, documentType]);

  return (
    <Layout>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="Step 1"
          description="Upload Your File"
          allowStepSelect={active > 0}
        >
          <FileUploadContainer />
        </Stepper.Step>
        <Stepper.Step
          label="Step 2"
          description="Choose The Type of Document"
          allowStepSelect={active > 1 && documentContent.length > 0}
        >
          <DocumentTypeSelectionContainer />
        </Stepper.Step>
        <Stepper.Step
          label="Step 3"
          description="Review &#38; Submit"
          allowStepSelect={active > 2}
        >
          <Box className={classes.previewTitleWrapper}>
            <Text className={classes.previewTitle}>
              The Document Type you have selected is {documentType}
            </Text>
          </Box>
        </Stepper.Step>
        <Stepper.Completed>
          <Stack align="center">
            <Text className={classes.completedTitle}>
              Completed, click back button to get to previous step if you want
              to make edits. Otherwise, Click here to proceed to the Document
              Creator.
            </Text>
            <Link href="/document-creator" passHref>
              <Button component="a">Go to Document Creator</Button>
            </Link>
          </Stack>
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={
            active === 3 ||
            (!isDocumentUploaded && active === 0) ||
            (!isDocumentTypeChosen && active === 1)
          }
        >
          Next step
        </Button>
      </Group>
    </Layout>
  );
};

export default Home;
