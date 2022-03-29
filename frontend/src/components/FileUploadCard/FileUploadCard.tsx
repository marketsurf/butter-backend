import { DocumentCreatorContext } from '@/utils/context/DocumentCreatorContext';
import { formatData } from '@/utils/helpers/formatData';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

import { FiFile } from 'react-icons/fi';

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUploadButton = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

type FormValues = {
  file_: FileList;
};

const FileUploadCard = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const documentCreatorContext = useContext(DocumentCreatorContext);
  //Loading state
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit((data) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(data.file_[0]);

    reader.onload = async () => {
      setLoading(true);
      // Create a new blob for pdf file
      const blob = new Blob([reader!.result!], { type: 'application/pdf' });
      const formData = new FormData();
      formData.append('file', blob);

      // Send a post request to /ocr with the file bytes
      const { data } = await axios.post('http://api.marketsurf.io:6000/ocr', 
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      documentCreatorContext.setContent(formatData(data.data));
      // console.log(data.data[0]);
      setLoading(false);
    };
  });

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required';
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb';
      }
    }
    return true;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack align="flex-start">
          <FormControl isInvalid={!!errors.file_} isRequired>
            <FormLabel>{'File input'}</FormLabel>

            <FileUploadButton
              accept={'application/pdf'}
              register={register('file_', { validate: validateFiles })}
            >
              <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
            </FileUploadButton>

            <FormErrorMessage>
              {errors.file_ && errors?.file_.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            isLoading={loading}
            loadingText="Loading and Processing..."
          >
            Upload File
          </Button>
        </Stack>
      </form>
      <ul>
        <li>{getValues('file_')?.item(0)?.name}</li>
      </ul>
    </>
  );
};

export default FileUploadCard;
