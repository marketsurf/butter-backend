import { DocumentContext } from '@/common/context/document';
import { Card, UnstyledButton, createStyles, Text } from '@mantine/core';
import React, { useContext } from 'react';
import { Icon } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  document: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    border: '1px solid transparent',
    transitionTimingFunction: 'ease',
    transitionDuration: '0.3s',
    transitionProperty: 'border-color',
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#FAF9F6',
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    boxShadow: `${theme.shadows.md} !important`,
  },

  active: {
    // backgroundColor:
    //   theme.colorScheme === 'dark'
    //     ? theme.colors.dark[8]
    //     : theme.colors.blue[1],
    boxShadow: `${theme.shadows.md} !important`,
    border: `1px solid ${theme.colors.blue[6]}`,
  },
}));

interface DocumentTypeCardProps {
  document: {
    title: string;
    icon: Icon;
    color: string;
  };
}

const DocumentTypeCard = ({ document }: DocumentTypeCardProps) => {
  const { classes, theme, cx } = useStyles();

  const { setDocumentType, documentType } = useContext(DocumentContext);

  const active = documentType === document.title;

  return (
    <UnstyledButton
      className={cx(classes.document, { [classes.active]: active })}
      onClick={() => {
        setDocumentType(document.title);
      }}
    >
      <document.icon color={document.color} size={80} />
      <Text size="lg" weight={700} mt={7}>
        {document.title}
      </Text>
    </UnstyledButton>
  );
};

export default DocumentTypeCard;
