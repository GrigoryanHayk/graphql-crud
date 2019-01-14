const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

const resolvers = require('./resolvers');
const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'));
const requireAuthDirective = require('./directives/requireAuthDirective');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:2107/crud", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "db connection error"));
db.once("open", () => {
    console.log("Db Connection Succeeded !!!");
});
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        requireAuth: requireAuthDirective
    },
    context: ({ req }) => {
        const authorization = req.headers['authorization'] || '';

        return {
            user: authorization
        };
    }
});

server.applyMiddleware({app});

app.listen({port: process.env.PORT || 4000}, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});