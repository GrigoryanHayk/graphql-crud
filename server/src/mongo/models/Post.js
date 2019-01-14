const buildModel = require('./buildModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { User } = require('./User');


const Post = buildModel('Post', {
    title: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
    description: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: User
    }
});

module.exports = {
    Post
};