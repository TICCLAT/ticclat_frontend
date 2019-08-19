import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BokehPlot from '../components/BokehPlot';
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

const about = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} className={classes.plotContainerSmall}>
                    <BokehPlot source="/plots/lexicon_size" />
                </Grid>
                <Grid item xs={12} md={6} className={classes.plotContainerSmall}>
                    <BokehPlot source="/plots/corpus_size" />
                </Grid>
                <Grid item xs={12} className={classes.plotContainerBig}>
                    <BokehPlot source="/plots/word_count_per_year" />
                </Grid>
                <Grid item xs={12} className={classes.plotContainerBig}>
                    <Paper>
                        <Grid container>
                            <Grid item xs={4} className={classes.plotContainerSmall}>
                                <BokehPlot source="/plots/paradigm_size?var=X" />
                            </Grid>
                            <Grid item xs={4} className={classes.plotContainerSmall}>
                                <BokehPlot source="/plots/paradigm_size?var=Y" />
                            </Grid>
                            <Grid item xs={4} className={classes.plotContainerSmall}>
                                <BokehPlot source="/plots/paradigm_size?var=Z" />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default about;
