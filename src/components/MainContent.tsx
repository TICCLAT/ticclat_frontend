import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Routes from '../pages/Routes';
import clsx from 'clsx';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    contentShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
            <Routes/>
        </main>
    );
};

export default MainContent;
