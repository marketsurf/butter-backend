import { DocumentContext } from '@/common/context/document';
import { convertFormToJson } from '@/utils/formatData';
import { downloadJsonDataFile } from '@/utils/helpers';
import {
  billOfLadingSchema,
  coveringLetterSchema,
  ownConfigurationSchema,
} from '@/utils/schema';
import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Switch,
  TextInput,
  Title,
  Text,
  Box,
  Paper,
  Stack,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';

import React, { useContext, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Trash } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.sm,
    width: '100%',
    maxWidth: '800px',
  },
  formTitle: {
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    fontWeight: 800,
    lineHeight: 1.1,
  },
  paper: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: '100%',
    mx: 'auto',
  },
  inputDragged: {
    backgroundColor: theme.colors.gray[5],
    border: `1px solid ${theme.colors.gray[2]}`,
  },
}));

interface FormContainerProps {
  documentType: string;
  form: UseFormReturnType<{
    data: FormList<{
      key: string;
      value: string;
    }>;
  }>;
}

const FormContainer = ({ form }: FormContainerProps) => {
  const { classes } = useStyles();
  const [error, setError] = useState<string>('');
  const [jsonAvailable, setJsonAvailable] = useState(false);

  const { documentType } = useContext(DocumentContext);

  // const form = useForm({
  //   initialValues: {
  //     data: formList([{ name: '', active: false }]),
  //   },
  // });

  const handleJsonGeneration = () => {
    const submittedForm = convertFormToJson(form.values.data);

    switch (documentType) {
      case 'Covering Letter':
        const { error } = coveringLetterSchema.validate(submittedForm.data);
        setError(error?.message ?? '');
        break;

      case 'Bill Of Lading':
        const { error: billOfLadingError } = billOfLadingSchema.validate(
          submittedForm.data,
        );
        setError(billOfLadingError?.message ?? '');
        break;

      case 'Own Configuration':
        const { error: ownConfigurationError } =
          ownConfigurationSchema.validate(submittedForm.data);
        setError(ownConfigurationError?.message ?? '');
        break;

      default:
        break;
    }

    if (!error) {
      setJsonAvailable(true);
    } else {
      setJsonAvailable(false);
    }
  };

  const fields = form.values.data.map((_, index) => (
    <Droppable
      droppableId={`form-value-${index}`}
      key={index}
      direction="vertical"
    >
      {(provided, snapshot) => (
        <div>
          <Group mt="xs">
            <TextInput
              placeholder="John Doe"
              required
              sx={{ flex: 1 }}
              {...form.getListInputProps('data', index, 'key')}
            />

            <TextInput
              placeholder="John Doe"
              required
              sx={{ flex: 1 }}
              {...form.getListInputProps('data', index, 'value')}
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? classes.inputDragged : ''}
            />

            {/* <Switch
        label="Active"
        {...form.getListInputProps('data', index, 'active')}
      /> */}
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => form.removeListItem('data', index)}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ));

  return (
    <Stack className={classes.root} align="baseline">
      <Title className={classes.formTitle}>{documentType} Configuration</Title>
      <Paper shadow="md" className={classes.paper} withBorder>
        <Box>
          {fields.length > 0 ? (
            <Group mb="xs">
              <Text weight={500} size="sm" sx={{ flex: 1 }}>
                Key
              </Text>
              <Text weight={500} size="sm" pr={90}>
                Value
              </Text>
            </Group>
          ) : (
            <Text color="dimmed" align="center">
              No fields
            </Text>
          )}

          {fields}

          <Group position="center" mt="md">
            <Button
              onClick={() => form.addListItem('data', { key: '', value: '' })}
            >
              Add fields
            </Button>
          </Group>
        </Box>
      </Paper>
      {!error && jsonAvailable && <Text color="green">Json is valid!</Text>}
      <Button onClick={() => handleJsonGeneration()}>Generate Data Json</Button>

      {jsonAvailable && (
        <Button
          variant="outline"
          onClick={() =>
            downloadJsonDataFile(convertFormToJson(form.values.data))
          }
        >
          Download Json Data
        </Button>
      )}

      {error && <Text color="red">{error}</Text>}
    </Stack>
  );
};

export default FormContainer;
