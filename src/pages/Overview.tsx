import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WordList from '../components/WordList';
import Timeline from '../components/timeline';

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: 1800,
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
const overview = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container={true} spacing={3}>
                <Grid item={true} xs={12} md={12} lg={9}>
                    <Paper>
                        <Timeline/>
                    </Paper>
                </Grid>

                <Grid item={true} xs={12} md={4} lg={3}>
                    <Paper className={classes.paper}>
                        <WordList onChange={console.log} />
                    </Paper>
                </Grid>

                <Grid item={true} xs={12}>
                    <Paper className={classes.paper}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default overview;
