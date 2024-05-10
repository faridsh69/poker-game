import { ThemeOptions } from '@mui/material'

export const LIGHT_THEME: ThemeOptions = {
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '50px !important',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {},
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {},
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {},
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {},
        outlined: {},
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {},
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {},
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {},
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
  },
}

export const THEME_NAMES = {
  light: 'light',
  dark: 'dark',
}

export const THEMES: { [key: string]: ThemeOptions } = {
  [THEME_NAMES.light]: LIGHT_THEME,
  [THEME_NAMES.dark]: {
    ...LIGHT_THEME,
    // @ts-ignore
    palette: {
      mode: 'dark',
    },
  },
}
