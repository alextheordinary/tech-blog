const router = require('express').Router();
const {User, Post, Comment} = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User, attributes: ['name']
        }]
    });
    const posts = postData.map(post => post.get({plain: true}));
    res.render('homepage', {posts});
  });
  
  module.exports = router;