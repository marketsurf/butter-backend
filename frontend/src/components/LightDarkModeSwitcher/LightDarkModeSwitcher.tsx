import {
  Group,
  SegmentedControl,
  Center,
  useMantineColorScheme,
  Box,
} from '@mantine/core';
import React from 'react';
import { Sun, Moon } from 'tabler-icons-react';

const LightDarkModeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl" ml="xl">
      <SegmentedControl
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default LightDarkModeSwitcher;
