import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
    fixedHeight: {
        height: 240,

    },

}));
const glossary = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container={true} spacing={3}>
                <Grid item={true} xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <div style={{ height: 200 }}>
                            <p>Glossary will be loaded soon...</p>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default glossary;
