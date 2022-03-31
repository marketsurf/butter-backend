import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Navbar, ScrollArea, Text } from '@mantine/core';
import { GripVertical } from 'tabler-icons-react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => {
  return {
    sidebar: {
      overflowY: 'scroll',
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
      padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
      paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
      marginBottom: theme.spacing.sm,
    },

    itemDragging: {
      boxShadow: theme.shadows.sm,
    },

    dragHandle: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[6],
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },
  };
});

interface SidebarProps {
  documentData: Array<string>;
}

const Sidebar = ({ documentData }: SidebarProps) => {
  const { classes, cx } = useStyles();

  const documents = documentData.map((document, index) => (
    <Draggable
      key={`document-${index}`}
      index={index}
      draggableId={`document-${index}`}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <GripVertical size={18} />
          </div>
          <div>
            <Text color="dimmed" size="sm">
              {document}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <Navbar height="calc(100vh - 60px)" width={{ sm: 300, md: 400 }} p="md">
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="lg">
        <Droppable droppableId="ocr-content" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {documents}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
