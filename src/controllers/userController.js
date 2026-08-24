const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

// Lê os usuários
function readUsers() {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
}

// Salva os usuários
function saveUsers(users) {
    fs.writeFileSync(
        dataPath,
        JSON.stringify(users, null, 2),
        'utf8'
    );
}

// Gera ID incremental
function generateId(users) {
    if (users.length === 0) {
        return 1;
    }

    return Math.max(...users.map(user => user.id)) + 1;
}

// GET /users
function getUsers(req, res) {
    try {
        const users = readUsers();

        return res.status(200).json({
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao carregar os usuários.'
        });
    }
}

// GET /users/:id
function getUserById(req, res) {
    try {
        const users = readUsers();
        const id = Number(req.params.id);

        const user = users.find(user => user.id === id);

        if (!user) {
            return res.status(404).json({
                error: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json({
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao buscar o usuário.'
        });
    }
}

// POST /users
function createUser(req, res) {
    try {
        const { name, email } = req.body;

        // Verifica campos obrigatórios
        if (!name || !email) {
            return res.status(400).json({
                error: 'Os campos name e email são obrigatórios.'
            });
        }

        // Verifica tipos e valores vazios
        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            name.trim() === '' ||
            email.trim() === ''
        ) {
            return res.status(400).json({
                error: 'Name e email devem ser preenchidos corretamente.'
            });
        }

        // Verifica formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                error: 'O e-mail informado possui formato inválido.'
            });
        }

        const users = readUsers();

        // Verifica e-mail duplicado
        const emailExists = users.some(
            user =>
                user.email.toLowerCase() ===
                email.trim().toLowerCase()
        );

        if (emailExists) {
            return res.status(400).json({
                error: 'O e-mail informado já está cadastrado.'
            });
        }

        const newUser = {
            id: generateId(users),
            name: name.trim(),
            email: email.trim().toLowerCase()
        };

        users.push(newUser);

        saveUsers(users);

        return res.status(201).json({
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno ao cadastrar o usuário.'
        });
    }
}

// PUT /users/:id
function updateUser(req, res) {
    try {
        const users = readUsers();
        const id = Number(req.params.id);

        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).json({
                error: 'Usuário não encontrado.'
            });
        }

        const { name, email } = req.body;

        // Validação
        if (!name || !email) {
            return res.status(400).json({
                error: 'Os campos name e email são obrigatórios.'
            });
        }

        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            name.trim() === '' ||
            email.trim() === ''
        ) {
            return res.status(400).json({
                error: 'Name e email devem ser preenchidos corretamente.'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                error: 'O e-mail informado possui formato inválido.'
            });
        }

        // Verifica se o e-mail pertence a outro usuário
        const emailExists = users.some(
            (user, i) =>
                i !== index &&
                user.email.toLowerCase() ===
                email.trim().toLowerCase()
        );

        if (emailExists) {
            return res.status(400).json({
                error: 'O e-mail informado já está cadastrado.'
            });
        }

        users[index] = {
            ...users[index],
            name: name.trim(),
            email: email.trim().toLowerCase()
        };

        saveUsers(users);

        return res.status(200).json({
            data: users[index]
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao atualizar o usuário.'
        });
    }
}

// DELETE /users/:id
function deleteUser(req, res) {
    try {
        const users = readUsers();
        const id = Number(req.params.id);

        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).json({
                error: 'Usuário não encontrado.'
            });
        }

        users.splice(index, 1);

        saveUsers(users);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao remover o usuário.'
        });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};