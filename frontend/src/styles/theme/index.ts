// theme.js
import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import components from './components';

const theme = extendTheme({
  colors,
  components,
  config: {
    initialColorMode: 'dark',
  },
});

export default theme;
