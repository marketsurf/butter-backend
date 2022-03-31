import { DocumentContext } from '@/common/context/document';
import { formatData } from '@/utils/formatData';
import {
  Button,
  createStyles,
  Group,
  MantineTheme,
  useMantineTheme,
  Text,
} from '@mantine/core';
import { Dropzone, DropzoneStatus, MIME_TYPES } from '@mantine/dropzone';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CloudUpload } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
    zIndex: 0,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
    zIndex: 1,
  },
}));

const getActiveColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
};

const FileUploadContainer = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef<() => void>(null);
  const [processing, setProcessing] = useState(false);
  const [documentUploaded, setDocumentUploaded] = useState(false);

  const { setDocumentContent, documentContent } = useContext(DocumentContext);

  // TODO: Fix the Next.js SSR issue regarding localStorage
  useEffect(() => {
    setDocumentUploaded(documentContent.length > 0);
  }, [documentContent.length]);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => {
          setProcessing(true);
          // Get the first file
          const file = files[0];

          const reader = new FileReader();

          reader.readAsArrayBuffer(file);

          reader.onload = async (e) => {
            const arrayBuffer = e.target?.result;
            if (arrayBuffer) {
              const blob = new Blob([arrayBuffer], {
                type: MIME_TYPES.pdf,
              });
              const formData = new FormData();
              formData.append('file', blob);

              const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/ocr`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              );

              setDocumentContent(formatData(data.data));
              setProcessing(false);
            }
          };
        }}
        onReject={(files) => {
          console.log('Function onReject is called');
          files.forEach((file) => {
            console.log(file);
          });
        }}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
        multiple={false}
        loading={processing}
      >
        {(status) => (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <CloudUpload size={50} color={getActiveColor(status, theme)} />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {documentUploaded
                ? 'You may proceed to the next step. You may upload another file if you would like to change the document.'
                : status.accepted
                ? 'Drop files here'
                : status.rejected
                ? 'Pdf file less than 30mb'
                : 'Upload your Scanned Document'}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              {documentUploaded
                ? ''
                : 'Drag and drop or click to upload. We can accept only pdf files that are less than 30mb in size.'}
            </Text>
          </div>
        )}
      </Dropzone>
      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current && openRef.current()}
        disabled={processing}
      >
        Select files
      </Button>
    </div>
  );
};

export default FileUploadContainer;
