import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WordList from './WordList';
import theme from './Theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Content from './MainContent';

interface IState {
    showSideDrawer: boolean;
}

class App extends React.Component<{}, IState> {
    state = {
        showSideDrawer: false,
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        const { showSideDrawer } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Header open={showSideDrawer} drawerToggle={this.sideDrawerToggleHandler}/>
                <WordList />
                <Content open={showSideDrawer}/>
            </MuiThemeProvider>
        );
    }
}

export default App;
