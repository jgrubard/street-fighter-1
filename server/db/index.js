const { _conn } = require('./conn');
const Player = require('./models/Player.js');

const sync = () => {
  return _conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Player.create({ name: 'Ken', imageUrl: '/images/Ken.png' }),
    Player.create({ name: 'Ryu', imageUrl: '/images/Ryu.png' }),
    Player.create({ name: 'Guile', imageUrl: '/images/Guile.png' }),
    Player.create({ name: 'Dhalsim', imageUrl: '/images/Dhalsim.png' }),
    Player.create({ name: 'Chun Li', imageUrl: '/images/ChunLi.png' }),
    Player.create({ name: 'Zangief', imageUrl: '/images/Zangief.png' }),
    Player.create({ name: 'Blanka', imageUrl: '/images/Blanka.png' }),
    Player.create({ name: 'E. Honda', imageUrl: '/images/EHonda.png' }),
    Player.create({ name: 'Balrog', imageUrl: '/images/Balrog.png' }),
    Player.create({ name: 'Vega', imageUrl: '/images/Vega.png' }),
    Player.create({ name: 'Sagat', imageUrl: '/images/Sagat.png' }),
    Player.create({ name: 'M. Bison', imageUrl: '/images/MBison.png' })
  ]);
}

module.exports = {
  sync,
  seed,
  models: {
    Player
  }
}
