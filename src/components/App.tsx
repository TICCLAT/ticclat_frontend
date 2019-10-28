import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ShoppingBagProvider } from '../context/ShoppingBag';
import theme from './Theme';

import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header';
import Content from './MainContent'


class App extends React.Component<{}, { showSideDrawer: boolean }> {
    state = {
        showSideDrawer: true
    }
    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        const { showSideDrawer } = this.state;
        return (
            <ShoppingBagProvider>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header open={showSideDrawer} drawerToggle={this.sideDrawerToggleHandler} />
                    <Content open={showSideDrawer} />
                </MuiThemeProvider>
            </ShoppingBagProvider>
        );
    }
}

export default App;
