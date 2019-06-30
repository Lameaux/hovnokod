import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import HomePage from './components/HomePage';
import CategoryPage from "./components/CategoryPage";
import CodePage from "./components/CodePage";
import ConditionsPage from "./components/ConditionsPage";
import Error404Page from "./components/Error404Page";
import ScrollToTop from "./components/ScrollToTop"

import { CATEGORIES } from './constants/categories';

export default props => (
    <BrowserRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/top(/.*)?" component={HomePage} />
                <Route exact path="/conditions" component={ConditionsPage} />
                <Route exact path="/error404" component={Error404Page} />

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
        </ScrollToTop>
    </BrowserRouter>
);
