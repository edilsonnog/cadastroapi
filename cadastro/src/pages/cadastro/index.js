import React, { Component } from 'react';

import {Pagination, Table, Button, Nav} from 'react-bootstrap';

var rows = [];

export default class dashboard extends Component {

    constructor (props) {
        super(props);

        this.state = {
            lista: [],
            paginaAtual: 1,
            itensPagina: 0,
            totalItens: 0,
            totalPaginas: 0,
            itens: []
       };
    }


    componentDidMount() {
        let url = "http://localhost:8080/api/cadastros";

        fetch(url)
        .then( res => res.json() )
        .then( (data) => {
            this.setState(
                {
                    lista: data,
                    totalItens: data.length,
                    totalPaginas: Math.ceil(data.length/ this.state.itensPagina)
                }
            )
        })

        let paginacao = "http://localhost:8080/api/cadastros?_limit=5&_page=1"
        fetch(paginacao)
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({itens: data})
            }
        )
    }

    render() {

        rows = [];
        for(let i=1; i<=this.state.totalPaginas; i++) {
            rows.push(
                <Pagination.Item key={1}
                 active={i===this.state.paginaAtual}>
                 </Pagination.Item>
            )
        }

        return (
            <div className="container">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Idade</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.itens.map(
                               (item, index) => (
                                   <tr key={item.id}>
                                       <th scope="row">{item.id}</th>
                                       <td>{item.nome}</td>
                                       <td>{item.idade}</td>
                                       <td>{item.cpf}</td>
                                       <td className="text-right">opções</td>
                                   </tr>
                               )
                           ) 
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
