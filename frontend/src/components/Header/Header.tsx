import React, { useState } from 'react';
import {
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Title,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import LightDarkModeSwitcher from '../LightDarkModeSwitcher';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface Header {
  links: { link: string; label: string }[];
}

const Header = ({ links }: Header) => {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();
  const router = useRouter();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} passHref>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: router.pathname === link.link,
        })}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <MantineHeader height={60}>
      <Container className={classes.header}>
        <Title>BuTTer</Title>
        <Group spacing={5} className={classes.links}>
          {items}
          <LightDarkModeSwitcher />
        </Group>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size="sm"
          className={classes.burger}
        />
      </Container>
    </MantineHeader>
  );
};

export default Header;
