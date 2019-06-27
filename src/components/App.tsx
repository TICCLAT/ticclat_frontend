import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './Theme';

import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header';
import Content from './MainContent'


class App extends React.Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        const { showSideDrawer } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                <Header open={showSideDrawer} drawerToggle={this.sideDrawerToggleHandler}></Header>
                <Content></Content>
            </MuiThemeProvider>
        );
    }
}

export default App;