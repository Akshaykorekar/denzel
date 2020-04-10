
const db = require("../db");
const imdb = require("../imdb");

const helloR = () => "Hello World!";

const populateR = async (_, args) => {
  const { id } = args;
  try {
    const results = await imdb(id);
    return { total: results.length };
  } catch (e) {
    return { error: e.message };
  }
};

const randomMovieR = async () => {
  try {
    const random_movie = await db.getRandomMustWatchMovie();
    return random_movie;
  } catch (e) {
    return { error: e.message };
  }
};

const movieR = async (_, args) => {
  const { id } = args;
  try {
    const movie = await db.getSpecifiedIDMovie(id);
    return movie;
  } catch (e) {
    return { error: e.message };
  }
};

const searchMovieR = async (_, args) => {
  try {
    let limit = parseInt(args.limit);
    let metascore = parseInt(args.metascore);
    const results = await db.searchMovies(limit, metascore);
    return { limit, metascore, results };
  } catch (e) {
    return { error: e.message };
  }
};

const postReviewR = async (_, args) => {
  const { id, date, review } = args;
  try {
    const result = await db.saveReview(id, date, review);
    return result;
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  helloR,
  populateR,
  randomMovieR,
  movieR,
  searchMovieR,
  postReviewR
};