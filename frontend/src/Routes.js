import React from 'react';
import { Switch, Route } from 'react-router-dom';

//chamando aas paginas
import Home from './pages/Home';
import About from './pages/About';

export default () => {

    return (
        //Rotas
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact pacth="/about">
                <About/>
            </Route>
        </Switch>
    );


}