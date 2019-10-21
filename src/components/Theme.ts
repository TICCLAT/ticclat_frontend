import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#468DCB'
        },
        secondary: {
            main: '#4BB543'
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