'use strict';

const express = require('express');

const PORT = 8090;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static('public'))

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);