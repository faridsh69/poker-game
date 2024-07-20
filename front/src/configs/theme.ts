import { ThemeOptions } from '@mui/material'

const important = ' !important'
export const globalTheme = {
  palette: {
    primary: {
      main: '#DF3939',
      contrastText: '#fff',
    },
    secondary: {
      light: '#B8B8B8',
      main: '#1A1A1A',
      dark: '#171717',
      contrastText: '#fff',
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
}

export const LIGHT_THEME: ThemeOptions = {
  components: {
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       textAlign: 'left',
    //       alignItems: 'flex-start',
    //     },
    //   },
    // },
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
          backgroundColor: globalTheme.palette.secondary.dark,
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
          color: globalTheme.palette.primary.contrastText + important,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: globalTheme.palette.primary.contrastText,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: globalTheme.palette.primary.main,
          fontSize: 14,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: 20,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          boxShadow: 'inset 0 2px 1px #000',
          borderBottom: '1px solid #3B3D3C',
          backgroundColor: globalTheme.palette.secondary.main + important,
          borderRadius: 7,
          '&&:after': {
            borderColor: '#DEBA79',
          },
        },
        input: {
          color: globalTheme.palette.primary.contrastText,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: globalTheme.palette.secondary.light + important,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: globalTheme.palette.primary.contrastText,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: globalTheme.palette.primary.contrastText + important,
        },
      },
    },
  },
  ...globalTheme,
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
