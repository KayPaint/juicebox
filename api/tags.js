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
        const postsByTag = await getPostsByTagName(tagName);

        const postsByTagName = postsByTag.filter(post => {
            return post.active || (req.user && post.author.id === req.user.id);
        });

        res.send({ postsByTagName });
    } catch ({ name, message }) {
        next({ name, message });
    }
});


module.exports = tagsRouter;