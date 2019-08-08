import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import SearchBar from '../components/SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Paradigms from '../components/Paradigms';
import Lexica from '../components/Lexica';
import NGramTimeline from '../components/NGramTimeline';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(15),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 300
    },
    fixedHeight: {
        height: 240,
    },
    cardContainer: {
        paddingLeft: 10

    },
    title: {
        padding: 10,
        margin: '20px 0',
        borderBottom: '1px solid #ddd',
        width: '100%'

    }
}));

const overview = ({ history }) => {
    const setValue = (value: string) => {
        setSearchValue(value.toLowerCase())
    }
    const [searchValue, setSearchValue] = useState();
    const classes = useStyles();
    useEffect(() => {
        if (location.search) {
            const param = new URLSearchParams(location.search)
            const value = param.get('searching')
            return setSearchValue(value!)
        }
        setSearchValue('regering')
    }, [history.location])

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid container={true} spacing={3}>
                <Grid item={true} xs={12} md={12} lg={12}>
                    <SearchBar onSearch={setValue} wordform={searchValue} />
                </Grid>
                <Grid item={true} xs={12} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        {/* <Timeline wordform={searchValue} /> */}
                        <NGramTimeline wordform={searchValue} />
                    </Paper>
                </Grid>

                <Grid item={true} xs={12} md={4} lg={4}>
                    <Paper>
                        <Typography variant="subtitle1" align="center">Lexica</Typography>
                        {searchValue !== '' ? <Lexica wordform={searchValue} /> : null}
                    </Paper>
                </Grid>
                <Typography variant="h4" gutterBottom={true} className={classes.title} color="primary">Paradigms</Typography>
                <Grid container={true} spacing={3} className={classes.cardContainer}>
                    {searchValue !== '' ? <Paradigms wordform={searchValue} /> : null}
                </Grid>
            </Grid>
        </Container>
    )
}

export default overview;