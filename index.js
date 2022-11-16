const PORT = 3000;
const express = require('express');
const server = express();

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});