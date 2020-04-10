const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const graphqlHTTP = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const imdb = require("./imdb");
const db = require("./db");
const { queryType } = require("./graphQL/queries");

const {
  PORT,
  DENZEL_IMDB_ID,
  LIMIT_SEARCH,
  METASCORE_SEARCH
} = require("./constants");

const app = express();
const schema = new GraphQLSchema({ query: queryType });

module.exports = app;

app.use(require("body-parser").json());
app.use(cors());
app.use(helmet());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.options("*", cors());

app.get("/", (request, response) => {
  response.send({ ack: true });
});

/*
1rst endpoint: populate db with movies of an actor id by default denzel_imdb_id
*/
app.get("/movies/populate/:id", async (request, response) => {
  if (request.params.id==undefined)
 { var id = DENZEL_IMDB_ID;
 }
 else{var id = request.params.id;}
  try {
    const results = await imdb(id);
    response.send({ total: results.length });
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

/*
2nd endpoint: Return a random must watch movie from the DB
*/
app.get("/movies", async (request, response) => {
  try {
    const random_movie = await db.getRandomMustWatchMovie();
    response.send(random_movie);
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

/*
3rd endpoint search
*/

app.get("/movies/search", async (request, response) => {
    let limit = parseInt(request.query.limit || LIMIT_SEARCH);
    let metascore = parseInt(request.query.metascore || METASCORE_SEARCH);
    const results = await db.searchMovies(limit, metascore);
    response.send({ limit, metascore, results });
  } );


/* 4th endpoint get specific movie with the chosen id
*/

app.get("/movies/:id", async (request, response) => {
    const { id } = request.params;
    try {
      
        const movie = await db.getSpecifiedIDMovie(id);
        response.send(movie);
      
    } catch (e) {
      response.status(404).send({ error: e.message });
    }
  });

/*
5th endpoint post a review to the specific movie (chosen by the id)
*/
app.post("/movies/:id", async (request, response) => {
  const { id } = request.params;
  // if not provided, adds null
  const { date, review } = request.body;
  try {
    const result = await db.saveReview(id, date, review);
    response.send(result);
  } catch (e) {
    response.status(404).send({ error: e.message });
  }
});

app.listen(PORT);
//console.log(`📡 Running on port ${PORT}`);