const graphql = require("graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLEnumType } = graphql;
const mongoose = require("mongoose");

const db = require("../../../../models");
const usersDB = db.users;
const booksDB = db.books;

const userType = new GraphQLObjectType({
  name: "users",
  fields: () => ({
    id: { type: GraphQLString },
    nom: { type: GraphQLString },
    prenom: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const bookType = new GraphQLObjectType({
  name: "books",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return "Hello from graphql";
      },
    },
    users: {
      type: new GraphQLList(userType),
      resolve(parents, args) {
        return usersDB.find();
      },
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args.id);
        return usersDB.find({ id: mongoose.Schema.ObjectId("fff") });
      },
    },
  },
});

var schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
