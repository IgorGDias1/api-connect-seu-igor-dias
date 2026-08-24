const express = require('express');

const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = 3000;

// Permite receber dados em JSON
app.use(express.json());

// Rotas da API
app.use('/', userRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.status(200).json({
        data: {
            message: 'API Connect funcionando!'
        }
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});