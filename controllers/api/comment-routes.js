const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Endpoint for /api/comments

// Returns an array of all comments associated with a post id + creator name of comment
router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [{
                model: User, attributes: ['name']
            }]
        },
        {
            where: {
                post_id: req.params.id
            }
        }
        );
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Creates a new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;