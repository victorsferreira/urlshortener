import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Create from './Create';
import Url from './Url';
import Alert from 'react-s-alert';

const Router = () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={Create} />
            <Route path="/:shortUrl" exact component={Url} />
        </Switch>
    </HashRouter>
);

export default Router;