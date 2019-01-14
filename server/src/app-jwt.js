const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    sign(payload, options = {expiresIn: '1d'}) {
        return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
    },
    verify(token, options = {expiresIn: '1d'}) {
        try {
            return jsonwebtoken.verify(token, process.env.JWT_SECRET, options);
        } catch (err) {
            return false;
        }
    },
    decode(token) {
        return jsonwebtoken.decode(token);
    }
};