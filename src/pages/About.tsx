import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';

const about = () => {
    return (
      <Container maxWidth="lg" style={{ marginTop: '2em' }}>
        <Paper>
            <h1>Ticclat</h1>
            <p>
                By Netherlands eScience Center and Meertens Institute.
            </p>
        </Paper>
        </Container>
    )
}

export default about;
