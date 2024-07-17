import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#2196f3',
                    light: '#fff',
                    dark: '#ccc',
                    contrastText: '#fff',
                },
                // secondary: {
                //     // main: '#333',

                // }
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