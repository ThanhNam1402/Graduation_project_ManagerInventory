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
                // secondary: {
                //     // main: '#333',

                // }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#333336',
                    light: '#42a5f5',
                    dark: '#1565c0',
                    contrastText: '#fff',
                },
            }
        }

    }
});

export default theme;