import { ThemeOptions } from '@mui/material'

const important = ' !important'
export const GLOBAL_THEME = {
  palette: {
    primary: {
      main: '#DF3939', // red
      contrastText: '#fff',
    },
    secondary: {
      light: '#B8B8B8', // grey
      main: '#616361',
      dark: '#171717',
      contrastText: '#fff',
    },
  },
  fonts: {
    small: 12,
    medium: 14,
    big: 16,
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
}

export const LIGHT_THEME: ThemeOptions = {
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '50px' + important,
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
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 0,
        },
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
    // Start of theme
    MuiContainer: {
      styleOverrides: {
        disableGutters: {
          backgroundColor: GLOBAL_THEME.palette.secondary.dark,
        },
        maxWidthXs: {
          marginTop: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: GLOBAL_THEME.palette.primary.contrastText + important,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: GLOBAL_THEME.palette.primary.contrastText,
        },
        subtitle1: {
          fontSize: GLOBAL_THEME.fonts.small,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: GLOBAL_THEME.palette.primary.main,
          fontSize: GLOBAL_THEME.fonts.medium,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: 5,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          boxShadow: 'inset 0 2px 1px #000',
          borderBottom: '1px solid #3B3D3C',
          backgroundColor: GLOBAL_THEME.palette.secondary.main + important,
          borderRadius: 7,
          '&&:after': {
            borderColor: '#DEBA79',
          },
        },
        input: {
          color: GLOBAL_THEME.palette.primary.contrastText,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: GLOBAL_THEME.palette.secondary.light + important,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: GLOBAL_THEME.palette.primary.contrastText,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: GLOBAL_THEME.palette.primary.contrastText + important,
        },
      },
    },
  },
  ...GLOBAL_THEME,
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
