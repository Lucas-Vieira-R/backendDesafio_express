const express = require('express');
const router = express.Router();


const documents ={
  1: 'titulo de imovel',
  2: 'cedula de identidade',
  3: 'titulo de divida',
  4: 'CDI',
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  const entradas = Object.entries(documents);
  const resultado = entradas.reduce((obj, [chave, valor])=>{
    obj[chave] = valor;
    obj['método'] = 'GET';
    return obj;
  }, {});
  res.send(resultado);
});

// POST new document
router.post('/', function(req, res, next) {
  const {id, document} = req.body;
  documents[id] = document;
  const resultado = {
    mensagem: 'documento adicionado com sucesso!',
    método: 'POST',
    novoDoc: {id, document},
  };
  res.send(resultado);
});

// DELETE document by ID
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  if (documents[id]) {
    delete documents[id];
    const resultado = {
      mensagem: 'documento removido com sucesso!',
      método: 'DELETE',
      DocIdRemovido: id,
    };
    res.send(resultado);
  } else {
    const resultado = {
      mensagem: 'documento não encontrado!',
      método: 'DELETE',
    };
    res.send(resultado);
  }
});

// PUT update document by ID
router.put('/:id', function(req, res, next) {
  const {id} = req.params;
  const {document} = req.body;
  if (users[id]) {
    documents[id] = document;
    const resultado = {
      mensagem: 'Documento atualizado com sucesso!',
      método: 'PUT',
      DocIdAtualizado: id,
    };
    res.send(resultado);
  } else {
    const resultado = {
      mensagem: 'Documento não encontrado!',
      método: 'PUT',
    };
    res.send(resultado);
  }
});

module.exports = router;
