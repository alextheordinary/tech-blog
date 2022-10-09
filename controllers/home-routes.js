const router = require('express').Router();
const queryHelpers = require('../utils/query-helpers');

router.get('/', async (req, res) => {
    const posts = await queryHelpers.getPosts();
    res.render('homepage', {posts});
  });
  
  module.exports = router;