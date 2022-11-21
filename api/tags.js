const express = require('express');
const tagsRouter = express.Router();

const { getAllTags } = require('../db');

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const { tagName } = req.params;

    try {
        const posts = await getPostsByTagName(tagName);

        res.send({ posts });
    } catch ({ name, message }) {
        next({ name, message });
    }
});


module.exports = tagsRouter;