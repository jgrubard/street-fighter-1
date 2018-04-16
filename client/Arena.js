import React, { Component } from 'react';

// import { attack } from './store/reusableFunctions'

class Arena extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    const { fighters } = this.props.location.state ? this.props.location.state : [];
    this.state = {
      player1: fighters ? fighters[0] : {},
      player2: fighters ? fighters[1] : {}
    }
    this.attack = this.attack.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  // changeHealth(player, health) {
  //   this.setState({
  //     [player]: {
  //       id: player.id,
  //       name: player.name,
  //       health
  //     }
  //   });
  // }

  attack(id) {
    const opponent = id === this.state.player1.id ? [this.state.player1, 'player1'] : [this.state.player2, 'player2'];
    const newHealth = opponent[0].health - 10;

    console.log('attacked ', opponent[0])

    // this.changeHealth(opponent[0], newHealth)
    this.setState({
      [opponent[1]]: {
        id: opponent[0].id,
        name: opponent[0].name,
        health: newHealth
      }
    });
  }

  resetGame() {
    const players = [this.state.player1, this.state.player2];
    players.forEach(player => this.changeHealth(player, 100))
  }

  render() {
    const { attack, resetGame } = this;
    if (!this.props.location.state) {
      this.props.history.push('/players');
      return null;
    }
    const { player1, player2 } = this.state;
    const fighters = [ player1, player2 ]
    const loser = fighters.find(fighter => {
      console.log(fighter.name, fighter.health)
      return fighter.health === 0
    });
    return (
      <div>
        <h2>BATTLE ARENA</h2>
        <h3>{player1.name} vs. {player2.name}</h3>
        {
          fighters.map(player => {
            const opponent = fighters.find(fighter => fighter.id !== player.id)
            return (
              <div key={player.id}>
                <h1>{player.name}'s Health: {player.health}</h1>
                <button onClick={() => attack(opponent.id)} disabled={loser}>Attack!</button>
              </div>

            )
          })
        }
        <h1>
        {
          loser ? (
            <div>
              {loser.name.toUpperCase() + ' LOSES!'}
              <button onClick={resetGame}>Play Again</button>
              <button>Select New Players</button>
            </div>
          ) : ''
        }
        </h1>


      </div>
    );
  }
}

export default Arena;
