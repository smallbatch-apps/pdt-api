const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
// const util = require('util');
require('dotenv').config();

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json())

app.use(cors());

routes(app);

module.exports = app;