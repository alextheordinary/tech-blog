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
            name: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
          });
          console.log(req.session);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        console.log(validPassword);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
          });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;