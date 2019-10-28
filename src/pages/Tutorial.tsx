import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const tutorial = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <div style={{ height: 200 }}>
                        <p>Tutorial will be loaded soon...</p>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default tutorial;