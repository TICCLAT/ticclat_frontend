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

/** Component to get an Overview of Ngram Timeline, Paradigms and Horizon Chart */
const overview = ({ history }: RouteComponentProps) => {
    /** State declaration to store search value  */
    const [searchValue, setSearchValue] = useState();
    const classes = useStyles();

    useEffect(() => {
        if (location.search) {
            const param = new URLSearchParams(location.search)
            const value = param.get('searching')
            return setSearchValue(value!)
        }
        /** Set Default serach value  */
        const searchWordform = localStorage.getItem('searchValue')
        searchWordform ? setSearchValue(searchWordform) : setSearchValue('regering');

    }, [history.location])

    // set Search Value on pressing search button or Enter in search bar 
    const setValue = (value: string) => {

        localStorage.setItem('searchValue', value)
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