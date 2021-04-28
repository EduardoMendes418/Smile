import React from 'react';
import { Switch, Route } from 'react-router-dom';

//chamando aas paginas
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default () => {

    return (
        //Rotas
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );


}