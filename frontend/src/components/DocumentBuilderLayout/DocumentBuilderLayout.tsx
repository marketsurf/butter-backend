import { DocumentContext } from '@/common/context/document';
import { AppShell } from '@mantine/core';
import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useListState } from '@mantine/hooks';
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state';
import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Header from '../Header';
import Sidebar from '../Sidebar';

interface DocumentBuilderLayoutProps {
  children: React.ReactNode;
  state: string[];
  handlers: UseListStateHandler<string>;
  form: UseFormReturnType<{
    data: FormList<{
      key: string;
      value: string;
    }>;
  }>;
}

const DocumentBuilderLayout = (props: DocumentBuilderLayoutProps) => {
  const { children, state, handlers, form } = props;

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (
          destination?.droppableId === 'ocr-content' &&
          source?.droppableId === 'ocr-content'
        ) {
          handlers.reorder({ from: source.index, to: destination.index });
        }

        if (
          destination?.droppableId !== 'ocr-content' &&
          source?.droppableId === 'ocr-content'
        ) {
          const formIndex = parseInt(destination?.droppableId.slice(-1) ?? '0');
          form.setListItem('data', formIndex, {
            key: form.values.data[formIndex].key,
            value: state[source?.index],
          });
        }
      }}
    >
      <AppShell
        navbar={<Sidebar documentData={state} />}
        header={
          <Header
            links={[
              { link: '/', label: 'Home' },
              { link: '/document-creator', label: 'Document Creator' },
            ]}
          />
        }
        padding={0}
      >
        {/* <Droppable droppableId="forms" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {provided.placeholder}
            </div>
          )}
        </Droppable> */}
        {/* Pass props to the children */}
        {children}
      </AppShell>
    </DragDropContext>
  );
};

export default DocumentBuilderLayout;
