// importing models
const { User, Post, Comment } = require('../models');

module.exports = {
    // Returns all posts
    getPosts: async () => {
        const postData = await Post.findAll({
            include: [{
                model: User, attributes: ['name']
            }]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        return posts;
    },
    // Returns a single post with comments
    getSinglePost: async (id) => {
        const postData = await Post.findByPk(id, {
            include: [{
                model: User, attributes: ['name']
            },
            { model: Comment, include: { model: User } }
            ]
        });
        const posts = postData.get({ plain: true });
        return posts;
    },
    // Returns all posts by a user
    getUserPosts: async (id) => {
        const postData = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post,
                include: { model: User, attributes: ['name'] }
            },
            ]
        });
        const posts = postData.get({ plain: true });
        return posts;
    },
    // Returns the user_id of a post
    getPostCreator: async (id) => {
        const postData = await Post.findByPk(id, {
            attributes: ['user_id']
        });
        const user_id = postData.get({ plain: true });
        console.log(user_id);
        return user_id;
    }
}