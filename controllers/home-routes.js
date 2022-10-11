const router = require('express').Router();
const queryHelpers = require('../utils/query-helpers');
const {withAuth, signedIn, creatorCheck} = require('../utils/auth');

// Route for home page - doesn't need to check logged in status to display content, but uses it to toggle link between login/logout
router.get('/', async (req, res) => {
    try {
        const posts = await queryHelpers.getPosts();
        res.render('homepage', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to display a single post with its comments. Checks to see if the user is logged in or else it will redirect to login page
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const post = await queryHelpers.getSinglePost(req.params.id);
        res.render('post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to display a user dashboard. Checks to see if the user is logged in or else it will redirect to login page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const posts = await queryHelpers.getUserPosts(req.session.user_id);
        res.render('dashboard', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to display login page. Checks to see if user is logged in and will redirect to home page if they are.
router.get('/login', signedIn, async (req, res) => {
    try {
        res.render('login')
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to signup. Checks to see if user is logged in and will redirect to home page if they are.
router.get('/signup', signedIn, async (req, res) => {
    try {
        res.render('signup')
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to add a post. Checks to see if the user is logged in or else it will redirect to login page
router.get('/add-post', withAuth, async (req, res) => {
    try {
        res.render('add-post', { logged_in: req.session.logged_in } )
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to edit a post. Checks to see if user is logged in and if the user is the creator of the post. Redirects if either check fails
router.get('/editpost/:id', withAuth, creatorCheck, async (req, res) => {
    try {
        const post = await queryHelpers.getSinglePost(req.params.id);
        res.render('editpost', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to add a comment
router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const post = await queryHelpers.getSinglePost(req.params.id);
        res.render('comment', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;