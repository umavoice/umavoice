require('dotenv').config();

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    user:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
};
