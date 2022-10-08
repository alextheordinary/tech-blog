const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Endpoint for /api/users

// Returns an array of all users - id, name
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
                'id', 'name'
            ]
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Return user data - name + all posts made by a specified user id
router.get('/:id', async (req, res) => {
    try {
        const users = await User.findByPk(req.params.id, {
            include: {
                model: Post
            },
            attributes: [
                'id', 'name'
            ]
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Creates a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;