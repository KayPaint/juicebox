const express = require('express');
const morgan = require('morgan');
const server = express();
require('dotenv').config();
const apiRouter = require('./api');

// Connect client to DB
const { client } = require('./db');
client.connect();

// Assign Port
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Middleware
server.use(morgan('dev'));
server.use(express.json());

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

// Routes
server.use('/api', apiRouter);