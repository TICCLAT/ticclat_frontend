import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    hide: {
        display: 'none',
    },
    gutter: {
        padding: 20
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },

}));
export interface IProps {
    open: boolean,
    drawerToggle: () => void
}
const SideNav = (props: IProps) => {
    const classes = useStyles();
    return (
        <Drawer variant='permanent'
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
            open={props.open}>
            <div>
                <IconButton onClick={props.drawerToggle}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Overview', 'About', 'Glossary', 'Tutorial'].map((text, index) => (
                    <ListItem key={text} title={text} classes={{ gutters: classes.gutter }}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
export default SideNav;