const { MONGO_URI } = require("./constants");
const { MongoClient } = require("mongodb");
const { METASCORE_DEFAULT } = require("./constants");
const {DATABASE_NAME } = require("./constants")

const getRandomMustWatchMovie = () => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) return reject({ message: err });
      const collection = client.db(DATABASE_NAME).collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      try {
        const all_movies = await collection.find().toArray();
        const awesome_movies = all_movies.filter(
          movie => movie.metascore >= METASCORE_DEFAULT
        );
        if (awesome_movies.length > 0)
          resolve(
            awesome_movies[Math.floor(Math.random() * awesome_movies.length)]
          );
        else reject({ message: "No awesome metascore movies!" });
      } catch (e) {
        reject({ message: e });
      }
    });
  });
};

const getSpecifiedIDMovie = id => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) return reject({ message: err });
      const collection = client.db(DATABASE_NAME).collection("movies");
      // random movie syntax, on the db side instead of fetching all documents
      try {
        const movie = await collection.findOne({ id });
        if (movie) resolve(movie);
        else reject({ message: "No movie found with that id." });
      } catch (e) {
        reject({ message: e });
      }
    });
  });
};


const searchMovies = (limit, metascore) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) return reject({ message: err });
      const collection = client.db(DATABASE_NAME).collection("movies");
      // all server side with MongoDB
      try {
        const movies = await collection
          .find({
            // metascore greater or equal
            metascore: { $gte: metascore }
          })
          .limit(limit)
          .sort({ metascore: -1 })
          .toArray();
        if (movies.length > 0) resolve(movies);
        else
          reject({
            message: "No movie found on the DB with these constraints."
          });
      } catch (e) {
        reject({ message: e });
      }
    });
  });
};


const saveReview = (id, date, review) => {
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return new Promise((resolve, reject) => {
    client.connect(async err => {
      if (err) return reject({ message: err });
      const collection = client.db(DATABASE_NAME).collection("movies");
      // all server side with MongoDB
      try {
        const res = await collection.findOneAndUpdate(
          { id },
          { $push: { reviews: { date, review } } }
        );
        if (res && res.value !== null) {
          const {
            value: { _id }
          } = res;
          resolve({ _id });
        } else reject({ message: "Can't find this id in the DB." });
      } catch (e) {
        reject({ message: e });
      }
    });
  });
};

module.exports = {
  getRandomMustWatchMovie,
  getSpecifiedIDMovie,
  searchMovies,
  saveReview
};