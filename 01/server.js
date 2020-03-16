'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '192.168.0.73';

const app = express();

app.use(express.static('public'))

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);