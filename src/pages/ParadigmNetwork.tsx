import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ParadigmViz from '../components/ParadigmViz';

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

const ParadigmNetwork = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.plotContainerBig}>
                    <ParadigmViz wordform="regering" />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ParadigmNetwork;
