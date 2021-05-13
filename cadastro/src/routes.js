import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Cadastro from './pages/cadastro/listaCadastro';
import Cadastrar from './pages/cadastro/cadastro.cadastrar';
import Editar from './pages/cadastro/cadastro.editar';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Cadastro} />
                <Route path="/cadastrar" exact component={Cadastrar} />
                <Route path="/editar/:id" exact component={Editar} />
            </Switch>
        </BrowserRouter>
    )
}