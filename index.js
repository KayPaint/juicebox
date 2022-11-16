const express = require('express');
const morgan = require('morgan');
const server = express();
const apiRouter = require('./api');

const PORT = 4845;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

server.use(morgan('dev'));
server.use(express.json());

server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});