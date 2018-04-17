import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import InputForm from './InputForm';

class Players extends Component {
  constructor() {
    super();
    this.state = {
      player: {}
    }
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(ev) {
    const { player } = this.state;
    const id = ev.target.value * 1;
    const selected = this.props.players.find(_player => _player.id === id);
    if (!Object.keys(player).length) {
      this.setState({ player: selected });
    } else {
      this.setState({ player: {} });
    }
  }

  render() {

    console.log(this.state)

    const { onSelect } = this;
    const { players } = this.props;
    const { player } = this.state;
    return (
      <div>
      <InputForm />
        <form>
          <ul>
            {
              players.map(_player => (
                <li key={_player.id}>
                  <input
                    type='checkbox'
                    value={_player.id}
                    onChange={onSelect}
                    disabled={Object.keys(player).length && player.id !== _player.id}
                  />
                  <label>{_player.name}</label>
                </li>
              ))
            }
          </ul>
        </form>
        <h4>Selected Player:</h4>
        <h3>{player.name}</h3>
        <Link to={{
          pathname: '/arena',
          state: { player }
        }}>
          <button disabled={!Object.keys(player).length}>Fight!</button>
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
