import {createMuiTheme} from '@material-ui/core/styles';
import shadows from './shadows';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#8F5D67',
        },
        secondary: {
            main: '#FBB276',
        },
        error: {
            main: '#D76562',
        },
        background: {
            default: 'rgba(255, 255, 255, 0)',
        },
        font: {
            default: 'rgba(0, 0, 0, 0.87)',
        }
    },
    shape: {
        borderRadius: 10,
    },
    shadows: shadows,
    props: {
        MuiCard: {
            elevation: 7
        }
    },
    overrides: {
        MuiListItem: {
            root: {width: "auto"}
        }
    }

});
