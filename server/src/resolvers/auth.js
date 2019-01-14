const { User } = require('../mongo/models/User');
const bcrypt = require('bcrypt');
const appJwt = require('./../app-jwt');
const { AuthenticationError } = require('apollo-server-express');

async function login(parent, {email, password}) {
    try {
        const user = await User.findOne({email});

        if (!user) {
            throw new Error('Cannot find user with this credentials, Please sign up');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new AuthenticationError('Invalid password');
        }

        const token = appJwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, { expiresIn: '1d' });

        return {
            token
        }
    } catch (e) {
        throw new AuthenticationError(e.message);
    }
}

async function signup(parent, userData) {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = userData;

        if (password !== confirmPassword) {
            throw new AuthenticationError('The password and confirmPassword fields are not equal');
        }

        const userEmail = await User.findOne({email: email});

        if (userEmail) {
            throw new AuthenticationError('This email is already taken');
        }

        const newUser = {
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email,
        };

        const passwordSalt = bcrypt.genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);
        newUser.password = bcrypt.hashSync(password, passwordSalt);
        newUser.role = "ADMIN";
        newUser.status = "APPROVED";

        const user = await User.create(newUser);

        const token = appJwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, { expiresIn: '1d' });

        return {
            token
        };
    } catch (e) {
        throw new AuthenticationError(e.message);
    }
}

module.exports = {
    login,
    signup
};