import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import SearchBar from '../components/SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '../components/timeline';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(10),
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
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <SearchBar onSearch={(value) => { alert(value) }} />
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper >
                        <Timeline></Timeline>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Typography variant="subtitle1" align="center">Lexicon</Typography>
                    </Paper>
                </Grid>
                <Grid container xs={12} md={12} lg={12} spacing={3}>
                    <Grid item xs={3} md={3} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="subtitle1" align="center">Paradigm 1</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="subtitle1" align="center">Paradigm 2</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="subtitle1" align="center">Paradigm 3</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default overview;