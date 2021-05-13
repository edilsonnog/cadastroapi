"use strict";

const firebase = require("../db");
const Cadastro = require("../models/cadastro");
const firestore = firebase.firestore();

const addCadastro = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("cadastro").doc().set(data);
    res.send("Cadastro savlvo com sucesso");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllCadastro = async (req, res, next) => {
  try {
    const cadastro = await firestore.collection("cadastro");
    const data = await cadastro.get();
    const cadastroArray = [];
    if (data.empty) {
      res.status(404).send("Nenhum registro encontrado!");
    } else {
      data.forEach((doc) => {
        const cadastro = new Cadastro(
          doc.id,
          doc.data().nome,
          doc.data().idade,
          doc.data().estado_civil,
          doc.data().cpf,
          doc.data().cidade,
          doc.data().estado
        );
        cadastroArray.push(cadastro);
      });
      res.send(cadastroArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCadastro = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cadastro = await firestore.collection("cadastro").doc(id);
    const data = await cadastro.get();
    const cadastroArray = [];
    if (!data.exists) {
      res.status(404).send("Cadastro com o ID fornecido não encontrado");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCadastro = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const cadastro = await firestore.collection("cadastro").doc(id);
    await cadastro.update(data);
    res.send("Registro atualizado com sucesso");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCadastro = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('cadastro').doc(id).delete();
        res.send('Registro deletado com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
  addCadastro,
  getAllCadastro,
  getCadastro,
  updateCadastro,
  deleteCadastro
};
