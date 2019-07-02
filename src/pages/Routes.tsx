import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Overview from './Overview';
import Glossary from './Glossary';
import About from './About';
import Tutorial from './Tutorial';
const Routes = () => {
    return (
        <Switch>
            <Route exact={true} path="/overview" component={Overview} />
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/glossary" component={Glossary} />
            <Route exact={true} path="/tutorial" component={Tutorial} />
            <Redirect from="/" exact={true} to="/overview" />
        </Switch>
    );
};

export default Routes;
