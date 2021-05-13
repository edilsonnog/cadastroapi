import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import api from "../../service/api";

import "./style.css";

function Forms() {
  const history = useHistory();
  const { id } = useParams();

  const [cadastro, setCadastro] = useState({});

  useEffect(() => {
    if (id) {
      async function loadCadastro() {
        const response = await api.get(`/api/cadastro/${id}`);
        setCadastro(response.data);
        console.log(response.data)
      }
      loadCadastro();
    }
  },[id]);

  const [erro, setErro] = useState("");
  const [mostrarError, setMostrarError] = useState("invisible");

  function validaFormulario(e) {
    e.preventDefault();

    if (cadastro.nome == null || cadastro.nome.length <= 0) {
      setErro("* O nome não pode ficar vazio");
      setMostrarError("visible");
      return;
    }

    if (cadastro.cpf == null || cadastro.cpf.length <= 0) {
      setErro("* O CPF não pode ficar vazio");
      setMostrarError("visible");
      return;
    }

    adicionarCadastro(cadastro);
  }

  function adicionarCadastro(xCadastro) {
    if (id){
      api.put(`/api/cadastro/${id}`, xCadastro).then(() => {
        toast.success('Cadastro alterado com sucesso!')
        history.push("/");
      });
    }else {
      api.post("/api/cadastro", xCadastro).then(() => {
        toast.success('Cadastro salvo com sucesso!')
        history.push("/");
      });
    }
    
  }

  return (
    <div className="container">
      <h3>Incluir Cadastro</h3>

      <div className="dropdown-divider"></div>

      <Form onSubmit={validaFormulario}>
        <div className="row">
          <Form.Group className="col-md-10">
            <Form.Label>Nome : </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter nome"
              name="nome"
              onChange={(e) =>
                setCadastro({ ...cadastro, nome: e.target.value })
              }
              value={cadastro.nome}
            />
          </Form.Group>
          <Form.Group className="col-md-2">
            <Form.Label>Idade : </Form.Label>
            <Form.Control
              type="idade"
              placeholder="Idade"
              onChange={(e) =>
                setCadastro({ ...cadastro, idade: e.target.value })
              }
              value={cadastro.idade}
            />
          </Form.Group>
        </div>
        <br />
        <div className="row">
          <Form.Group className="col-md-6">
            <Form.Label>Estado Civil : </Form.Label>
            <Form.Control
              type="estado_civil"
              placeholder="Enter Estado Civil"
              onChange={(e) =>
                setCadastro({ ...cadastro, estado_civil: e.target.value })
              }
              value={cadastro.estado_civil}
            />
          </Form.Group>
          <Form.Group className="col-md-3">
            <Form.Label>CPF : </Form.Label>
            <Form.Control
              type="cpf"
              placeholder="Enter CPF"
              onChange={(e) =>
                setCadastro({ ...cadastro, cpf: e.target.value })
              }
              value={cadastro.cpf}
            />
          </Form.Group>
        </div>
        <br />
        <div className="row">
          <Form.Group className="col-md-6">
            <Form.Label>Cidade : </Form.Label>
            <Form.Control
              type="cidade"
              placeholder="Enter nome"
              onChange={(e) =>
                setCadastro({ ...cadastro, cidade: e.target.value })
              }
              value={cadastro.cidade}
            />
          </Form.Group>
          <Form.Group className="col-4">
            <Form.Label>Selecione Estado :</Form.Label>
            <Form.Control
              as="select"
              type="estado"
              onChange={(e) =>
                setCadastro({ ...cadastro, estado: e.target.value })
              }
              value={cadastro.estado}
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
            </Form.Control>
          </Form.Group>
        </div>
        <br />
        <div className={`alert alert-danger ${mostrarError}`}>{erro}</div>
        <div className="btButton">
          <Button type="submit" variant="primary">
            Salvar
          </Button>
          <Button variant="danger" onClick={(e) => history.push("/")}>
            Voltar
          </Button>
          <Button variant="warning" type="reset">
            Limpa Formulario
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Forms;
