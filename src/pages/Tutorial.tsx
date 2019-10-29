import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Tutorials from '../components/Tutorials';
const tutorial = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <Tutorials />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default tutorial;