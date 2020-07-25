require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dburi = process.env.DB_URI
mongoose
  .connect(dburi, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((e) => {
    console.log(`Connected to ${e.connection.host} ${e.connection.db.databaseName}`);
  })
  .catch((e) => {
    console.error('error connecting to db');
  });
module.exports = app;