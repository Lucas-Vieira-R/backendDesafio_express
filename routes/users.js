const express = require('express');
const router = express.Router();


const users ={1: 'john', 2: 'luke', 3: 'gabriel', 4: 'peter'};

/* GET users listing. */
router.get('/', function(req, res, next) {
  const entradas = Object.entries(users);
  const resultado = entradas.reduce((obj, [chave, valor])=>{
    obj[chave] = valor;
    obj['método'] = 'GET';
    return obj;
  }, {});
  res.send(resultado);
});

// POST new user
router.post('/', function(req, res, next) {
  const {id, name} = req.body;
  users[id] = name;
  const resultado = {
    mensagem: 'Usuário adicionado com sucesso!',
    método: 'POST',
    novoUsuario: {id, name},
  };
  res.send(resultado);
});

// DELETE user by ID
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  if (users[id]) {
    delete users[id];
    const resultado = {
      mensagem: 'Usuário removido com sucesso!',
      método: 'DELETE',
      userIdRemovido: id,
    };
    res.send(resultado);
  } else {
    const resultado = {
      mensagem: 'Usuário não encontrado!',
      método: 'DELETE',
    };
    res.send(resultado);
  }
});

// PUT update user by ID
router.put('/:id', function(req, res, next) {
  const {id} = req.params;
  const {name} = req.body;
  if (users[id]) {
    users[id] = name;
    const resultado = {
      mensagem: 'Usuário atualizado com sucesso!',
      método: 'PUT',
      userIdAtualizado: id,
    };
    res.send(resultado);
  } else {
    const resultado = {
      mensagem: 'Usuário não encontrado!',
      método: 'PUT',
    };
    res.send(resultado);
  }
});

module.exports = router;
