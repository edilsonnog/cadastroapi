import { response } from "express";
import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import api from "../../service/api";

import "./style.css";

function Forms() {

  const { id } = useParams();

  const history = useHistory();
  const [cadastro, setCadastro] = useState([]);
  const [nome, setNome] = useState({});
  useEffect(() => {
    async function loadCadastro() {
      api.get(`/api/cadastro/${id}`)
      .then(response => (setCadastro = response));
    }
    loadCadastro();
}, []);

function handleChange(e) {
  setCadastro({
    ...cadastro,
    [e.target.name]: e.target.value,
  });
}

function handleSubmit(e) {
  e.preventDefault();
  api.post("/api/cadastro", cadastro).then(() => {
    history.push("/");
  });
}

return (
  <div className="container">
    <h3>Incluir Cadastro</h3>
    
    <div className="dropdown-divider"></div>

    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-10">
          <label htmlFor="nome">Nome : </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Enter nome"
            name="nome"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="Idade">Idade : </label>
          <input
            type="text"
            className="form-control"
            id="Idade"
            placeholder="Idade"
            name="idade"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="estado_civil">Estado Civil : </label>
          <input
            type="text"
            className="form-control"
            id="estado_civil"
            placeholder="Enter Estado Civil"
            name="estado_civil"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="cpf">CPF : </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            placeholder="Entre CPF"
            name="cpf"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="cidade">Cidade : </label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            placeholder="Entre Cidade"
            name="cidade"
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="estado">Selecione Estado : </label>
          <select
            className="form-control"
            id="estado"
            name="estado"
            onChange={handleChange}
          >
            <option value="">Selecione ....</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
      </div>
      <br />
      <div className="btButton">
        <button type="submit" className="btn btn-primary">
          Salvar
          </button>
        <Button variant="danger" href="/">
          Cancelar
          </Button>
      </div>
    </form>
  </div>
);
}

export default Forms;
