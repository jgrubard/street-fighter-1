const { _conn, Sequelize } = require('../conn');

const Player = _conn.define('player', {
  name: Sequelize.STRING,
  health: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  }
});

module.exports = Player;
