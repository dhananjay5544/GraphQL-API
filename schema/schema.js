const axios = require("axios");

const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");

// news data
const newsType = new GraphQLObjectType({
  name: "News",
  fields: () => ({
    newsId: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    date: { type: GraphQLString },
    status: { type: GraphQLInt },
  }),
});

// category data
const categoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    categoryId: { type: GraphQLInt },
    categoryName: { type: GraphQLString },
  }),
});

// root query
const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    news: {
      type: new GraphQLList(newsType),
      resolve(parent, args) {
        return axios
          .get("http://139.59.28.80:5000/api/news/")
          .then((res) => res.data.data[0]);
      },
    },
    categories: {
      type: new GraphQLList(categoryType),
      resolve(parent, args) {
        return axios
          .get("http://139.59.28.80:5000/api/news/listCategories")
          .then((res) => res.data.data[0]);
      },
    },
    categoryNews: {
      type: new GraphQLList(newsType),
      args: {
        categoryId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`http://139.59.28.80:5000/api/news/${args.categoryId}`)
          .then((res) => res.data.data[0]);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
