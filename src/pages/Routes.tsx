import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Overview from './Overview';
import Glossary from './Glossary';
import About from './About';
import Tutorial from './Tutorial';
const Routes = () => {
    return (
        <Switch>
            <Route exact path='/overview' component={Overview} />
            <Route exact path='/about' component={About} />
            <Route exact path='/glossary' component={Glossary} />
            <Route exact path='/tutorial' component={Tutorial} />
            <Redirect from="/" exact to="/overview" />
        </Switch>
    )
}

export default Routes;