const router = require('express').Router();
const queryHelpers = require('../utils/query-helpers');

router.get('/', async (req, res) => {
    const posts = await queryHelpers.getPosts();
    res.render('homepage', { posts });
});

router.get('/posts/:id', async (req, res) => {
    const post = await queryHelpers.getSinglePost(req.params.id);
    res.render('post', { post });
});

module.exports = router;