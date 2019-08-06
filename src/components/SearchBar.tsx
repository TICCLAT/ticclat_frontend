import React, { useState } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    search: {
        display: 'inline-flex',

        // backgroundColor: fade(theme.palette.common.black, 0.15),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.black, 0.25),
        // },
        marginRight: theme.spacing(2),
        marginLeft: 0,
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
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}));

interface IProps {
    onSearch: (searchValue: string) => void
}
const SearchBar = (props: IProps) => {
    const classes = useStyles({});
    const { onSearch } = props;
    const [serachValue, setSearchValue] = useState('');
    return (
        <div className={classes.search}>
            <InputBase
                placeholder="Enter Word To Search For..."
                classes={{
                    input: classes.inputSearch,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => setSearchValue(event.target.value)}
            />
            <div className={classes.searchIcon}>
                <IconButton onClick={() => onSearch(serachValue)} color="primary">
                    <SearchIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default SearchBar;