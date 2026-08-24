const express = require('express');

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Listar usuários
router.get('/users', getUsers);

// Buscar usuário por ID
router.get('/users/:id', getUserById);

// Cadastrar usuário
router.post('/users', createUser);

// Atualizar usuário
router.put('/users/:id', updateUser);

// Remover usuário
router.delete('/users/:id', deleteUser);

module.exports = router;