const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
// const { MONGODBLocal } = require("./config");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/");

const express = require("express");

const PORT = process.env.PORT || 4000;
const MONGODB = process.env.MONGODB || MONGODBLocal;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
