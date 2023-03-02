import { createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
