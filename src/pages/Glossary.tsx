import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GlossaryDescription from '../components/GlossaryDescription';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },

}));

const glossary = ({ history }: RouteComponentProps) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper>
                        <div style={{ height: 200 }} >
                            <p>Glossary will be loaded soon...</p>
                        </div>
                        <div style={{ height: 500 }} >
                            <p>Glossary will be loaded soon...</p>
                        </div>
                        <div style={{ height: 200 }} >
                            <p>Glossary will be loaded soon...</p>
                        </div>

                        <GlossaryDescription title="Ngram" >
                            <Typography component="p" variant="subtitle1" id="ngram">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Paradigm" >
                            <Typography component="p" variant="subtitle1" id="paradigm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </GlossaryDescription>
                        <GlossaryDescription title="Horizon" >
                            <Typography component="p" variant="subtitle1" id="horizon">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </GlossaryDescription>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default glossary;
