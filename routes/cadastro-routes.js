const express = require('express');
const { addCadastro, 
        getAllCadastro, 
        getCadastro,
        updateCadastro,
        deleteCadastro
       } = require('../controllers/cadastroController');

const router = express.Router();

router.post('/cadastro', addCadastro);
router.get('/cadastros', getAllCadastro);
router.get('/cadastro/:id', getCadastro);
router.put('/cadastro/:id', updateCadastro);
router.delete('/cadastro/:id', deleteCadastro);

module.exports = {
    routes: router
}