'use strict';
const express = require('express');
const app = express();
const router = require('./src/routes');

// banco de dados
require('./src/database/index');


app.use(router);

app.listen(8081, () => console.log('Servidor rodando na url: http://localhost:8081'));