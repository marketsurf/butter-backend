import { DocumentContext } from '@/common/context/document';

import DocumentBuilderLayout from '@/components/DocumentBuilderLayout';
import FormContainer from '@/components/FormContainer';
import PreviewContainer from '@/components/PreviewContainer';
import { convertFormToJson, convertJsonToForm } from '@/utils/formatData';
import { getConfigFile } from '@/utils/helpers';

import { Box, createStyles } from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';

import React, { useContext, useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const DocumentCreator = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const { documentType, documentContent } = useContext(DocumentContext);
  const [state, handlers] = useListState(documentContent);
  const { classes } = useStyles();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  const configShape = getConfigFile(documentType);

  const form = useForm({
    initialValues: {
      data: formList(convertJsonToForm(configShape ?? {})),
    },
  });

  return isBrowser ? (
    <DocumentBuilderLayout form={form} state={state} handlers={handlers}>
      <Box className={classes.root}>
        <FormContainer documentType={documentType} form={form} />
        <PreviewContainer form={form} />
      </Box>
    </DocumentBuilderLayout>
  ) : null;
};

export default DocumentCreator;
