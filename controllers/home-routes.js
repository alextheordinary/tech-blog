const router = require('express').Router();
const queryHelpers = require('../utils/query-helpers');

router.get('/', async (req, res) => {
    try {
        const posts = await queryHelpers.getPosts();
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await queryHelpers.getSinglePost(req.params.id);
        res.render('post', { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const posts = await queryHelpers.getUserPosts(2);
        res.render('dashboard', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;