const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// JSON Server (banco db.json) exposto em /api  ->  /api/pessoas
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ logger: false });
app.use('/api', middlewares, router);

// Páginas HTML do CRUD
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
