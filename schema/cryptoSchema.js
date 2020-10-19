const axios = require("axios");

const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    address: {
      type: new GraphQLObjectType({
        name: "address",
        fields: () => ({
          street: { type: GraphQLString },
          suite: { type: GraphQLString },
          city: { type: GraphQLString },
          zipcode: { type: GraphQLString },
        }),
      }),
    },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    company: {
      type: new GraphQLObjectType({
        name: "company",
        fields: () => ({
          name: { type: GraphQLString },
          catchPhrase: { type: GraphQLString },
          bs: { type: GraphQLString },
        }),
      }),
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/users/1`)
          .then((res) => res.data);
      },
    },
    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
