import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "react-bootstrap";
import {
  Container,
  Pagination,
  PaginationButton,
  PaginationItem,
} from "./styles";
import "./style.css";

import api from "../../service/api";

function Tables() {
  const [cadastros, setCadastros] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadCadastro() {
      const response = await api.get(
        `/api/cadastros?page=${currentPage}&limit=${limit}`
      );
      setTotal(response.data.length);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setCadastros(response.data);
    }

    loadCadastro();
  }, [currentPage, limit, total]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);

  function excluirCadastro(id) {
    api.delete(`/api/cadastro/${id}`);
  }

  return (
    <Container>
      <h3>Tabela de Cadastro</h3>
      <div className="dropdown-divider"></div>
      <div className="top">
        <div>
          <select className="custom-select" onChange={limits}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="100">100</option>
          </select>
        </div>
        <div>
          <Button variant="primary" href="/cadastrar">
            Novo Cadastro
          </Button>
        </div>
      </div>

      <Table className="table table-striped" size="sm">
        <thead>
          <tr>
            <th scope="col" className="col-3">
              Nome
            </th>
            <th scope="col" className="col-3">
              Idade
            </th>
            <th scope="col" className="col-3">
              CPF
            </th>
            <th scope="col"> Ações</th>
          </tr>
        </thead>
        <tbody>
          {cadastros.map((cadastro) => (
            <tr key={cadastro.id}>
              <td>{cadastro.nome}</td>
              <td>{cadastro.idade}</td>
              <td>{cadastro.cpf}</td>
              <td>
                <div>
                  <Button
                    className="topBt"
                    variant="outline-warning"
                    href={`/editar/${cadastro.id}`}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    className="topBt"
                    onClick={(e) => {
                      excluirCadastro(cadastro.id);
                    }}
                    href={"/"}
                    variant="outline-danger"
                  >
                    Deletar
                  </Button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <div>Qtd {total}</div>
        <PaginationButton>
          {currentPage > 1 && (
            <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem
              isSelect={page === currentPage}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationItem>
          ))}
          {currentPage < pages.length && (
            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </PaginationItem>
          )}
        </PaginationButton>
      </Pagination>
      </Container>
  );
}

export default Tables;
