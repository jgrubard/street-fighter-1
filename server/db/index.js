const { _conn } = require('./conn');
const Player = require('./models/Player.js');

const sync = () => {
  return _conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Player.create({ name: 'Ken' }),
    Player.create({ name: 'Ryu' }),
    Player.create({ name: 'Guile' }),
    Player.create({ name: 'Dhalsim' }),
    Player.create({ name: 'Chun Li' }),
    Player.create({ name: 'Zangeif' }),
    Player.create({ name: 'Blanka' }),
    Player.create({ name: 'E. Honda' }),
    Player.create({ name: 'Balrog' }),
    Player.create({ name: 'Vega' }),
    Player.create({ name: 'Sagat' }),
    Player.create({ name: 'M. Bison' })
  ]);
}

module.exports = {
  sync,
  seed,
  models: {
    Player
  }
}
