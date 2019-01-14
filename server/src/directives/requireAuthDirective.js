const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');
const { User } = require('./../mongo/models/User');
const appJwt = require('./../app-jwt');

class RequireAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = async function (...args) {
            const [, , gp] = args;

            if (gp.user) {
                const verifyUser = appJwt.verify(gp.user);

                if (verifyUser) {
                    try {
                        const user = await User.findOne({_id: verifyUser.id, email: verifyUser.email});

                        if (!user.role || !user.role.includes("ADMIN")) {
                            throw new AuthenticationError(
                                "You are not authorized to view this resource."
                            );
                        } else {
                            const result = await resolve.apply(this, args);

                            return result;
                        }
                    } catch (e) {
                        throw new AuthenticationError(
                            "You are not authorized to view this resource."
                        );
                    }
                } else {
                    throw new AuthenticationError(
                        "You are not authorized to view this resource."
                    );
                }
            } else {
                throw new AuthenticationError('You must be signed in to view this resource');
            }
        }
    }
}

module.exports = RequireAuthDirective;