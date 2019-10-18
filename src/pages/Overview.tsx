import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import OverViewTabs from '../components/OverviewTabs';
import { RouteComponentProps } from 'react-router-dom';

// Material UI Styles for Overview Component
const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(15),
    },

}));

const overview = ({ history }: RouteComponentProps) => {
    // Declare state to store search value
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

    // set Search Value on pressing search button or Enter in search bar 
    const setValue = (value: string) => {
        history.push({
            pathname: '/overview',
            search: '?searching=' + value,
        })
        setSearchValue(value)
    }


    return (
        <Container maxWidth="xl" className={classes.container}>
            <OverViewTabs
                searchValue={searchValue}
                onSearch={(value: string) => setValue(value)}
            />
        </Container>
    )
}

export default overview;