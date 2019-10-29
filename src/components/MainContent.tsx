import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import Routes from '../pages/Routes';
import clsx from 'clsx'
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: 0
    },
}));
export interface IProps {
    open: boolean;
}
const MainContent = (props: IProps) => {
    const classes = useStyles();
    const { open } = props;
    return (
        <main className={clsx(classes.content, open && classes.contentShift)}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.container}>
                <Routes />
            </Container>
        </main>
    )
}

export default MainContent;