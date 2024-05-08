const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;

// for future reference, the issue was that I had exposed port 5173 internally (5173:5173) in the docker compose dev yaml, but the internal port in the container is actually 3000. So it needs to be 5173:3000
