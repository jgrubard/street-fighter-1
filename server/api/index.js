const app = require('express').Router();

module.exports = app;

app.use('/players', require('./players'));
