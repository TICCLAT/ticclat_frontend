import React, { useState, useEffect } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// Material UI styles for Search Bar 
const useStyles = makeStyles((theme: Theme) => createStyles({
    search: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: `0px ${theme.spacing(2)}px`,
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSearch: {
        padding: theme.spacing(1, 1, 1, 1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.main, 0.11),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.25),
        },
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
}));

// Declare Prop Type
interface IProps {
    onSearch: (searchValue: string) => void
    wordform: string
}
const SearchBar = (props: IProps) => {
    const classes = useStyles();
    // Destructuring props
    const { onSearch, wordform } = props;
    // Decalre State to store value in search bar
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (wordform) {
            return setSearchValue(wordform)
        }
    }, [wordform])

    return (
        <div className={classes.search}>
            <InputBase
                value={searchValue}
                placeholder="Enter Word To Search For..."
                classes={{ input: classes.inputSearch }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') { onSearch(searchValue) }
                }
                }
            />
            <div className={classes.searchIcon}>
                <IconButton onClick={() => onSearch(searchValue)} color="primary" >
                    <SearchIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default SearchBar;