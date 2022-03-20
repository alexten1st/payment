const dotenv = require("dotenv");
dotenv.config();

const host = "localhost";
const port = "27017";
const database = "payment";


const dbUrl = `mongodb://${host}:${port}/${database}`;



const options =
{
  useUnifiedTopology: true,
  useNewUrlParser: true
};


module.exports = {dbUrl, options};
