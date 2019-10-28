import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    plotContainerSmall: {
        minHeight: 300,
    },
    plotContainerBig: {
        minHeight: 600,
    },

}));

const about = () => {
    const classes = useStyles();
    return (
        <div>
            By Netherlands eScience Center and Meertens Institute.
        </div>
    )
}

export default about;
