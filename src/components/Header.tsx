import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer';
import ShoppingBagIndicator from './ShoppingBag/ShoppingBagIndicator';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

  toolbar: {
    paddingRight: 24,
    justifyContent: 'flex-end'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },


}));

export interface IProps {
  open: boolean;
  drawerToggle: () => void;
}

const Header = ({ open, drawerToggle }: IProps) => {
  const classes = useStyles();


  return (
    <>
      <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            onClick={drawerToggle}
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> */}

          <ShoppingBagIndicator />
        </Toolbar>
      </AppBar>
      <Drawer open={open} drawerToggle={drawerToggle} />
    </>
  );
};

export default Header;
