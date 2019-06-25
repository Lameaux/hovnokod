import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import HeaderNavigation from '../HeaderNavigation';
import HomePage from '../HomePage';
import CategoryPage from "../CategoryPage";
import CodePage from "../CodePage";

import * as ROUTES from '../../constants/routes';
import { CATEGORIES } from '../../constants/categories';


const App = () => (
    <Router>
        <HeaderNavigation />

        <hr/>

        <Switch>
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.ADD} component={HomePage} />
            <Route exact path={ROUTES.CONDITIONS} component={HomePage} />

            {
                // Categories
                Object.keys(CATEGORIES).map(
                    key => (
                        <Route key={key} exact path={'/' + key} component={CategoryPage} />
                    )
                )
            }

            <Route exact path="/:id" component={CodePage} />
        </Switch>
    </Router>
);

export default App;