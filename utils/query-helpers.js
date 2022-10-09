// importing models
const { post } = require('../controllers/home-routes');
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
    getSinglePost: async (id) => {
        const postData = await Post.findByPk(id, {
            include: [{
                model: User, attributes: ['name']
            },
            {model: Comment, include: {model: User}}
        ]
        });
        const posts = postData.get({plain: true});
        return posts;
    },
    getPostComments: async (id) => {
        const commentData = await Comment.findAll({
            include: [{
                model: User, attributes: ['name']
            }]
        },
            {
                where: {
                    post_id: id
                }
            }
        );
        const comments = commentData.map(comment => comment.get({plain: true}));
        return comments;
    },
}