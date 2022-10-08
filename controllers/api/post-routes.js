const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Endpoint for /api/posts

// Returns an array of all posts + creator name of each post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User, attributes: ['name']
            }]
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Returns an array of a single post + creator name of the post
router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findByPk(req.params.id, {
            include: [{
                model: User, attributes: ['name']
            }]
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Creates a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Updates a post - title and content can be changed
router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deletes a post by id
router.delete('/:id', async (req, res) => {
    try {
        const destroyPost = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(destroyPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;