import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import InputForm from './InputForm';

class Players extends Component {
  constructor() {
    super();
    this.state = {
      fighters: []
    }
    this.onSelect = this.onSelect.bind(this);
    // this.enterArena = this.enterArena.bind(this);
  }

  onSelect(ev) {
    const id = ev.target.value * 1;
    const _fighter = this.props.players.find(player => player.id === id);
    const { fighters } = this.state;
    if (fighters.length < 3) {
      if (fighters.indexOf(_fighter) !== -1) {
        this.setState({ fighters: fighters.filter(fighter => fighter.id !== _fighter.id) });
      } else {
        this.setState({ fighters: [ ...fighters, _fighter ] });
      }
    }
  }

  // enterArena() {
  //   if (this.state.length === 2) {
  //     return (
  //       <Link to='/arena' />
  //     );
  //   }
  // }


  render() {

    console.log(this.state.fighters)

    const { onSelect, enterArena } = this;
    const { players } = this.props;
    const { fighters } = this.state;
    return (
      <div>
      <InputForm />
        <form>
          <ul>
            {
              players.map(player => (
                <li key={player.id}>
                  <input
                    type='checkbox'
                    value={player.id}
                    onChange={onSelect}
                    disabled={fighters.length === 2 && fighters.indexOf(player) === -1 }
                  />
                  <label>{player.name}</label>
                </li>
              ))
            }
          </ul>
        </form>

        <h4>Selected Players</h4>
        <h3>Player 1: {fighters[0] ? fighters[0].name : ''}</h3>
        <h3>Player 2: {fighters[1] ? fighters[1].name : ''}</h3>
        <Link to={{
          pathname: '/arena',
          state: { fighters }
        }}>
          <button disabled={fighters.length < 2}>Fight!</button>
        </Link>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { players } = state;
  return {
    players
  }
}

export default connect(mapStateToProps)(Players);
