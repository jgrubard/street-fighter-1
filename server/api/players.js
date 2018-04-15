const app = require('express').Router();
const Player = require('../db/models/Player')

module.exports = app;

app.get('/', (req, res, next) => {
  Player.findAll()
    .then(players => res.send(players))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Player.create(req.body)
    .then(player => res.send(player))
    .catch(next);
});
