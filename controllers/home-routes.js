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
        const posts = await queryHelpers.getUserPosts(req.session.user_id);
        res.render('dashboard', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;