import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import TestPage from 'app/pages/TestPage';

export default function RouterWrapper() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    component={TestPage}
                />
            </Switch>
        </BrowserRouter>
    );
}
