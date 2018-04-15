import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlayerThunk } from '../store';


class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onInputChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.savePlayer(this.state);
    this.setState({ name: '' });
  }

  render() {

    const { name } = this.state;
    const { onInputChange, onSave } = this;

    return (
      <form onSubmit={onSave}>
        <input
          onChange={ onInputChange }
          placeholder='Enter Name'
          name='name'
          value={name}
        />
        <button>Create New Player</button>
      </form>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePlayer: (player) => dispatch(createPlayerThunk(player))
  }
}

export default connect(null, mapDispatchToProps)(InputForm);



