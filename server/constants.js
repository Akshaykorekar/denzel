const IMDB_NAME_URL = "https://www.imdb.com/name";
const IMDB_TITLE_URL = "https://www.imdb.com/title";
const DENZEL_IMDB_ID = "nm0000243";
const IMDB_URL = "https://www.imdb.com";
const P_LIMIT = 25;
const LIMIT_SEARCH = 5;
const METASCORE_SEARCH = 0;
const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 9292;
const MONGO_URI =/* process.env.NODE_ENV === "production"
? process.env.MONGO_URI
:*/"mongodb+srv://student_ey:LA3rX0Bd9V6zIdti@clusterwebapps-agkgg.mongodb.net/test?retryWrites=true&w=majority";
const METASCORE_DEFAULT = 70;
const DATABASE_NAME = "ClusterWebApps";

module.exports = {
  IMDB_NAME_URL,
  IMDB_TITLE_URL,
  IMDB_URL,
  DENZEL_IMDB_ID,
  DATABASE_NAME,
  METASCORE_DEFAULT,
  MONGO_URI,
  LIMIT_SEARCH,
  METASCORE_SEARCH,
  P_LIMIT,
  PORT
};