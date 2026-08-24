# API Connect

API REST desenvolvida em Node.js e Express para gerenciamento de usuários. O projeto foi desenvolvido como um MVP (Produto Mínimo Viável), utilizando um arquivo JSON como mecanismo provisório de persistência de dados.

## Objetivo

A API Connect tem como objetivo fornecer ao front-end uma estrutura de serviços HTTP para gerenciamento de usuários.

A API permite realizar as principais operações de um CRUD:

* Listar usuários;
* Buscar um usuário específico pelo ID;
* Cadastrar novos usuários;
* Atualizar usuários existentes;
* Remover usuários.

A comunicação entre cliente e servidor utiliza o protocolo HTTP e o formato JSON.

## Tecnologias utilizadas

* **Node.js** — ambiente de execução do JavaScript no back-end;
* **Express** — framework utilizado para criação do servidor e das rotas HTTP;
* **Nodemon** — ferramenta utilizada durante o desenvolvimento para reinicialização automática do servidor;
* **JavaScript** — linguagem utilizada na implementação;
* **JSON** — formato utilizado para comunicação e persistência provisória dos dados;
* **Git** — sistema de controle de versão;
* **GitHub** — plataforma utilizada para hospedagem e compartilhamento do código-fonte.

## Estrutura do projeto

```text
api-connect/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── data/
│   │   └── users.json
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidade dos principais arquivos

**`src/server.js`**

Ponto de entrada da aplicação. Responsável por inicializar o Express, configurar o middleware JSON, registrar as rotas e iniciar o servidor HTTP.

**`src/routes/userRoutes.js`**

Responsável pela definição das rotas relacionadas aos usuários e pelo direcionamento das requisições para os controladores correspondentes.

**`src/controllers/userController.js`**

Concentra a lógica das operações realizadas sobre os usuários, incluindo cadastro, listagem, busca, atualização e remoção.

**`src/data/users.json`**

Arquivo utilizado como mecanismo provisório de persistência dos usuários.

**`.gitignore`**

Define arquivos e diretórios que não devem ser enviados para o repositório Git, como `node_modules`.

**`package.json`**

Contém as informações do projeto, scripts e dependências utilizadas pela aplicação.

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

* Node.js;
* npm;
* Git.

É possível verificar as versões instaladas utilizando:

```bash
node -v
npm -v
git --version
```

## Instalação

Primeiramente, clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/api-connect-seu-nome-sobrenome.git
```

Entre na pasta do projeto:

```bash
cd api-connect-seu-nome-sobrenome
```

Instale as dependências:

```bash
npm install
```

O comando instalará as dependências registradas no `package.json`, incluindo o Express e as ferramentas utilizadas durante o desenvolvimento.

## Execução

Para executar a aplicação em modo de desenvolvimento utilizando o Nodemon:

```bash
npm run dev
```

Também é possível executar a aplicação diretamente com Node.js:

```bash
npm start
```

Após a inicialização, o servidor estará disponível em:

```text
http://localhost:3000
```

Uma mensagem semelhante à seguinte será exibida no terminal:

```text
Servidor executando em http://localhost:3000
```

## Persistência de dados

A aplicação utiliza o arquivo:

```text
src/data/users.json
```

como mecanismo provisório de persistência.

Essa estratégia foi escolhida por se tratar de um MVP e permite realizar as operações CRUD sem a necessidade de configurar um banco de dados.

Os registros possuem a seguinte estrutura:

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

Os IDs são gerados de forma incremental com base no maior ID existente na coleção.

## Endpoints

A API disponibiliza os seguintes endpoints:

| Método | Endpoint     | Descrição                | Status de sucesso |
| ------ | ------------ | ------------------------ | ----------------- |
| GET    | `/users`     | Lista todos os usuários  | 200               |
| GET    | `/users/:id` | Busca um usuário pelo ID | 200               |
| POST   | `/users`     | Cadastra um novo usuário | 201               |
| PUT    | `/users/:id` | Atualiza um usuário      | 200               |
| DELETE | `/users/:id` | Remove um usuário        | 204               |

## 1. Listar usuários

### Requisição

```http
GET /users
```

Esse endpoint retorna todos os usuários armazenados na aplicação.

### Resposta

```json
{
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao.silva@example.com"
    },
    {
      "id": 2,
      "name": "Maria Santos",
      "email": "maria.santos@example.com"
    }
  ]
}
```

**Status:** `200 OK`

## 2. Buscar usuário por ID

### Requisição

```http
GET /users/1
```

O parâmetro `:id` identifica o usuário que deverá ser localizado.

### Resposta de sucesso

```json
{
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@example.com"
  }
}
```

**Status:** `200 OK`

### Usuário inexistente

Caso o ID informado não exista:

```http
GET /users/999
```

A API retorna:

```json
{
  "error": "Usuário não encontrado."
}
```

**Status:** `404 Not Found`

## 3. Cadastrar usuário

### Requisição

```http
POST /users
Content-Type: application/json
```

### Corpo da requisição

```json
{
  "name": "Carlos Oliveira",
  "email": "carlos.oliveira@example.com"
}
```

### Resposta

```json
{
  "data": {
    "id": 3,
    "name": "Carlos Oliveira",
    "email": "carlos.oliveira@example.com"
  }
}
```

**Status:** `201 Created`

### Validação

Os campos `name` e `email` são obrigatórios.

Caso o campo `email` não seja enviado:

```json
{
  "name": "Carlos Oliveira"
}
```

a API retorna:

```json
{
  "error": "Os campos name e email são obrigatórios."
}
```

**Status:** `400 Bad Request`

Também são realizadas validações para evitar valores vazios, e-mails inválidos e e-mails duplicados.

## 4. Atualizar usuário

### Requisição

```http
PUT /users/1
Content-Type: application/json
```

### Corpo da requisição

```json
{
  "name": "João da Silva",
  "email": "joao.silva@example.com"
}
```

A API localiza o usuário pelo ID e atualiza os dados fornecidos.

### Resposta

```json
{
  "data": {
    "id": 1,
    "name": "João da Silva",
    "email": "joao.silva@example.com"
  }
}
```

**Status:** `200 OK`

Caso o ID não exista, a API retorna:

```json
{
  "error": "Usuário não encontrado."
}
```

**Status:** `404 Not Found`

## 5. Remover usuário

### Requisição

```http
DELETE /users/1
```

A API localiza o usuário pelo ID e remove o registro do arquivo de persistência.

Em caso de sucesso, a API retorna:

**Status:** `204 No Content`

Caso o usuário não exista:

```json
{
  "error": "Usuário não encontrado."
}
```

**Status:** `404 Not Found`

## Padronização das respostas

A API utiliza uma estrutura padronizada para facilitar o consumo pelo front-end.

Respostas de sucesso utilizam a propriedade:

```json
{
  "data": {}
}
```

Respostas de erro utilizam:

```json
{
  "error": "Mensagem do erro."
}
```

Essa padronização torna as respostas mais previsíveis e facilita o tratamento dos resultados pelo cliente.

## Códigos HTTP utilizados

| Código | Significado           | Utilização                       |
| ------ | --------------------- | -------------------------------- |
| `200`  | OK                    | Operações realizadas com sucesso |
| `201`  | Created               | Cadastro de novo usuário         |
| `204`  | No Content            | Remoção realizada com sucesso    |
| `400`  | Bad Request           | Dados de entrada inválidos       |
| `404`  | Not Found             | Usuário não encontrado           |
| `500`  | Internal Server Error | Erro interno da aplicação        |

## Testes dos endpoints

Os endpoints foram testados utilizando um cliente HTTP, simulando o comportamento de um front-end.

Foram considerados os seguintes cenários:

### Criação com sucesso

```http
POST /users
```

Payload:

```json
{
  "name": "João da Silva",
  "email": "joao.silva@example.com"
}
```

Resultado esperado:

```text
201 Created
```

### Falha na criação

```http
POST /users
```

Payload sem e-mail:

```json
{
  "name": "Maria Oliveira"
}
```

Resultado esperado:

```text
400 Bad Request
```

### Listagem geral

```http
GET /users
```

Resultado esperado:

```text
200 OK
```

### Busca de usuário inexistente

```http
GET /users/999
```

Resultado esperado:

```text
404 Not Found
```

## Controle de versão

O projeto utiliza Git para controle de versão.

Para inicializar o repositório local:

```bash
git init
```

Para adicionar os arquivos:

```bash
git add .
```

Para criar o primeiro commit:

```bash
git commit -m "feat: implementa API REST de usuários"
```

Depois, o repositório local pode ser conectado ao repositório remoto do GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/api-connect-seu-nome-sobrenome.git
```

E o projeto pode ser enviado ao GitHub com:

```bash
git branch -M main
git push -u origin main
```

## `.gitignore`

O arquivo `.gitignore` deve impedir que dependências locais sejam enviadas ao GitHub.

Exemplo:

```gitignore
node_modules/
.env
```

A pasta `node_modules` não precisa ser versionada porque suas dependências podem ser restauradas posteriormente com:

```bash
npm install
```

## Considerações finais

A API Connect foi desenvolvida como um MVP para demonstrar a implementação de uma API REST utilizando Node.js e Express.

A aplicação possui uma estrutura organizada em rotas, controladores e dados, seguindo o princípio de separação de responsabilidades. As operações CRUD utilizam os métodos HTTP adequados e trabalham com JSON.

A persistência em arquivo JSON atende ao objetivo desta primeira versão, permitindo desenvolver e testar as funcionalidades sem a necessidade de um banco de dados. Em uma versão futura, essa camada poderá ser substituída por um banco de dados real para melhorar aspectos como escalabilidade, concorrência, segurança e desempenho.

O projeto também possui validações de entrada, tratamento de registros inexistentes, códigos de status HTTP apropriados e respostas JSON padronizadas, proporcionando uma comunicação mais previsível entre a API e o front-end.
