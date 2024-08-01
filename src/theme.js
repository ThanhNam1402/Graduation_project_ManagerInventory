import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#2196f3',
                    light: '#fff',
                    dark: '#333',
                    contrastText: '#fff',
                },
                warning: {
                    main: '#76ff03',
                    light: '#ccff90',
                    dark: '#ccff90',
                    contrastText: '#333',
                },
                success: {
                    main: '#4caf50',
                    light: '#81c784',
                    dark: '#81c784',
                    contrastText: '#fff',
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#bbdefb',
                    light: '#fff',
                    dark: '#fff',
                    contrastText: '#333',
                },
            }
        }

    }
});

export default theme;