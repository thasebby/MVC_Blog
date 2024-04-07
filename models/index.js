import { Comment } from './Comments.js'
import { Post } from './Post.js'
import { User } from './User.js'

//User relationships
User.hasMany(Post, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// Post relationships
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

// Comment relationships
Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Post, {
    foreignKey: 'post_id',
});

export { Comment, Post, User }