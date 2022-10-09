// importing models
const {User, Post, Comment} = require('../models');

module.exports = {
    getPosts: async () => {
        const postData = await Post.findAll({
            include: [{
                model: User, attributes: ['name']
            }]
        });
        const posts = postData.map(post => post.get({plain: true}));
        return posts;
    },
    getUserPosts: async (id) => {
        const postData = await Post.findByPk(id, {
            include: [{
                model: User, attributes: ['name']
            }]
        });
        const posts = postData.map(post => post.get({plain: true}));
        return posts;
    },
}