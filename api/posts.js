const express = require('express');
const postsRouter = express.Router();

const { getAllPosts, createPost } = require('../db');
const { requireUser } = require('./utils');

postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = {};

    // only send the tags if there are some to send
    if (tagArr.length) {
        postData.tags = tagArr;
    }   

    try {
        postData.title = title;
        postData.content = content;
        postData.authorId = req.user.id;

        const post = await createPost(postData);

        // if the post comes back, res.send({ post });
        if (post) {
            res.send({ post });
        } else {
            next({
                name: 'Post Error',
                message: 'An error occured while creating the post'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        posts
    });
});

module.exports = postsRouter;