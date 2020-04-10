const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const {
  helloR,
  populateR,
  randomMovieR,
  movieR,
  searchMovieR,
  postReviewR
} = require("./resolvers");
const {
  populateType,
  movieType,
  searchMovieType,
  movieIdType
} = require("./types");

//Define the Query
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: helloR
    },
    populate: {
      type: populateType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: populateR
    },
    randomMovie: {
      type: movieType,
      resolve: randomMovieR
    },
    movie: {
      type: movieType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: movieR
    },
    searchMovie: {
      type: searchMovieType,
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
        metascore: { type: GraphQLInt, defaultValue: 0 }
      },
      resolve: searchMovieR
    },
    postReview: {
      type: movieIdType,
      args: {
        id: { type: GraphQLString },
        date: { type: GraphQLString, defaultValue: null },
        review: { type: GraphQLString, defaultValue: null }
      },
      resolve: postReviewR
    }
  }
});
exports.queryType = queryType;