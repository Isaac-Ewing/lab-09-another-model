const soupCont = require('./controllers/routes.js');

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/soup', soupCont);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
