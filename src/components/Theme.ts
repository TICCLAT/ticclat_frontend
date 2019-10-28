import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#468DCB' // Primary blue color from Clariah
        },
        secondary: {
            main: '#757575', // Default color for Side drawer text
            light: "#fff"
        },
        common: {
            black: '#000',
        }
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    overrides: {
        MuiTypography: {
            root: {
                padding: 10
            }
        }
    }
})


export default theme;