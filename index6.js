const express = require('express');

const server = express();

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

// localhost:3000/curso/2
server.get('/curso/:id', (req, res) => {
  const id = req.params.id;

  return res.json({ curso: `A id do Curso Node.js é: ${id}` });
});

server.listen(3000);