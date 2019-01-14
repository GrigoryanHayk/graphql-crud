const { Post } = require('./../mongo/models/Post');
const { User } = require('./../mongo/models/User');
const appJwt = require('./../app-jwt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { AuthenticationError } = require('apollo-server-express');

async function posts(parent, args, context) {
    try {
        const userToken = context.user;
        const userByToken = appJwt.verify(userToken);

        const user = await User.findOne({_id: userByToken.id});

        const posts = await Post.find({
            user_id: user.id
        });

        return posts;
    } catch (e) {
        return e.message;
    }
}

async function post(parent, { id }, context) {
    try {
        const userToken = context.user;
        const userByToken = appJwt.verify(userToken);

        const user = await User.findOne({_id: userByToken.id});

        const post = await Post.findOne({
            _id: id,
            user_id: user.id
        });

        return {
            id: post._id.toString(),
            title: post.title,
            description: post.description,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }
    } catch (e) {
        throw new AuthenticationError(
            "You are not authorized to view this post."
        );
    }
}

async function createPost(parent, { title, description, text }, context) {
    try {
        const userToken = context.user;
        const userByToken = appJwt.verify(userToken);

        const user = await User.findOne({_id: userByToken.id});

        const createdPost = {
            title,
            description,
            text,
            createdAt: 'now',
            updatedAt: '',
            user_id: user._id
        };
        createdPost.createdAt = new Date();
        createdPost.updatedAt = new Date();

        const post = await Post.create(createdPost);

        return {
            id: post._id.toString(),
            title: post.title,
            description: post.description,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    } catch (e) {
        throw new AuthenticationError(
            "You are not authorized to create post."
        );
    }
}

async function updatePost(parent, { id, title, description, text }, context) {
    try {
        const userToken = context.user;
        const userByToken = appJwt.verify(userToken);

        const updatePost = {
            title,
            description,
            text,
            updatedAt: new Date()
        };

        const post = await Post.findOneAndUpdate(
            {
                _id: ObjectId(id),
                user_id: ObjectId(userByToken.id)
            },
            updatePost,
            {new: true}
        );

        return {
            id: post._id.toString(),
            title: post.title,
            description: post.description,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    } catch (e) {
        throw new AuthenticationError(
            "You are not authorized to update this post."
        );
    }
}

async function deletePost(parent, { id }, context) {
    try {
        const userToken = context.user;
        const userByToken = appJwt.verify(userToken);

        const user = await User.findOne({_id: userByToken.id});

        const post = await Post.remove(
            {
                _id: ObjectId(id),
                user_id: ObjectId(userByToken.id)
            }
        );

        const posts = await Post.find({
            user_id: user.id
        });

        return posts;
    } catch (e) {
        throw new AuthenticationError(
            "You are not authorized to remove this post."
        );
    }
}

module.exports = {
    posts,
    post,
    createPost,
    updatePost,
    deletePost
};