const { signup, login } = require('./auth');
const { posts, post, createPost, updatePost, deletePost } = require('./posts-crud');

const resolvers = {
    Query: {
        posts,
        post
    },
    Mutation: {
        signup,
        login,
        createPost,
        updatePost,
        deletePost
    }
};

module.exports = resolvers;
