const buildModel = require('./buildModel');

const User = buildModel('User', {
    name: {
        type: String,
        default: ''
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    role: String,
    status: String
});

module.exports = {
    User
};