// models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A Post belongs to a User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// A Comment belongs to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// A Comment belongs to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// A Post has many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = {
    User,
    Post,
    Comment
};