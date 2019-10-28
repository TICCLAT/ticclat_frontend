import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@material-ui/core';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';
import Menu from '../data/Menu';
// Declare drawer width
const drawerWidth = 240;

// Materail Ui styles for Side drawer
const useStyles = makeStyles(theme => ({
    hide: {
        display: 'none',
    },
    gutter: {
        padding: 20
    },
    toolbar: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        border: 0
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
    navLink: {
        textDecoration: 'none',
        color: theme.palette.secondary.main
    },
    selectedItem: {
        color: theme.palette.primary.main
    },
    title: {
        flexGrow: 1,
        color: theme.palette.secondary.light
    }

}));

// Props for SideNav
export interface IProps extends RouteComponentProps {
    open: boolean,
    drawerToggle: () => void
}

// Wrap sidenav in withRouter to access location.
const SideNav = withRouter((props: IProps) => {

    const classes = useStyles();
    const isActive = (match: string) => {
        return match === props.location.pathname.slice(1) ? classes.selectedItem : '';
    }
    return (
        <Drawer
            variant='permanent'
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
            open
        >
            <div className={classes.toolbar} >
                <Typography component="h1" variant="h6" noWrap={true} className={classes.title} >
                    Ticclat Explorer
          </Typography>
            </div>

            <Divider />
            <List>

                { // Menu enlists a sideNav Menu e.g. Overview, Glossary
                    Menu.map((item, index) => (
                        <NavLink
                            to={item.name.toLowerCase()}
                            key={index}
                            className={classes.navLink}
                        >
                            <ListItem
                                key={index}
                                title={item.name}
                                classes={{ gutters: classes.gutter }}
                            >
                                <ListItemIcon className={isActive(item.name.toLowerCase())}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} className={isActive(item.name.toLowerCase())} />
                            </ListItem>
                        </NavLink>
                    ))}

            </List>

        </Drawer>
    )
})
export default SideNav;