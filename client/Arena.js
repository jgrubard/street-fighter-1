import React, { Component } from 'react';
import { connect } from 'react-redux';

class Arena extends Component {
  constructor(props) {
    super(props);
    const { player } = this.props.location.state ? this.props.location.state : {};
    const { opponents } = this.props.opponents.length ? this.props : []
    this.state = {
      player: player,
      playerHealth: 100,
      opponents: opponents,
      opponentHealth: 100,
      currentMovePlayer: '',
      currentMoveOpponent: ''
    }
    this.randomAttack = this.randomAttack.bind(this);
    // this.battle = this.battle.bind(this);
  }

  clearMove() {
    setTimeout(() => {
      this.setState({ currentMove: '' })
    }, 3000)
  }

  generateMove() {
    const { offense } = this.props;
    const randomOffensiveMove = Object.keys(offense)[Math.round(Math.random() * 6)];
    const block = !!Math.round(Math.random())
    return [randomOffensiveMove, block];
  }

  randomAttack(attacker, opponent) {

    this.setState({ currentMovePlayer: '', currentMoveOpponent: '' })

    const { offense } = this.props;
    const { player, playerHealth, opponentHealth } = this.state;
    // const randomOffensiveMove = Object.keys(offense)[Math.round(Math.random() * 6)];
    // const block = !!Math.round(Math.random())
    // console.log()
    // console.log('Attack Type:', randomOffensiveMove);
    // console.log('Damage:', offense[randomOffensiveMove]);
    // console.log('blocked:', block);
    // console.log('--NEXT-ATTACK--')

    let randomOffensiveMove = this.generateMove()[0];
    let block = this.generateMove()[1];


    // console.log(`${attacker.name} used ${randomOffensiveMove} to attack ${opponent.name}`);
    // console.log(block ? `${opponent.name} blocked ${attacker.name} and took no damage!` : `${opponent.name} could not block ${attacker.name}. ${offense[randomOffensiveMove]} damage points sustained`);


      if (!block) {
        this.setState({
          opponentHealth: opponentHealth - offense[randomOffensiveMove],
          currentMovePlayer: (
            <div>
              <div>
                {`${attacker.name} used ${randomOffensiveMove} to attack ${opponent.name}.`}
              </div>
              <div>
              {`${opponent.name} could not block ${attacker.name}.`}
              </div>
              <div>
              {`${offense[randomOffensiveMove]} damage points sustained`}
              </div>
            </div>
            )
        });
      } else {
        this.setState({
          currentMovePlayer: (
            <div>
              <div>
                {`${attacker.name} used ${randomOffensiveMove} to attack ${opponent.name}.`}
              </div>
              <div>
              {`${opponent.name} blocked ${attacker.name}!`}
              </div>
              <div>
              {`No damage taken!`}
              </div>
            </div>
            )
        });
      }
      // this.clearMove();

    randomOffensiveMove = this.generateMove()[0];
    block = this.generateMove()[1];


    setTimeout(() => {

      // this.setState({ currentMoveOpponent: '' })

      if (!block) {
        this.setState({
          playerHealth: playerHealth - offense[randomOffensiveMove],
          currentMoveOpponent: (
            <div>
              <div>
                {`${opponent.name} used ${randomOffensiveMove} to attack ${attacker.name}.`}
              </div>
              <div>
              {`${attacker.name} could not block ${opponent.name}.`}
              </div>
              <div>
              {`${offense[randomOffensiveMove]} damage points sustained`}
              </div>
            </div>
            )
        });
      } else {
        this.setState({
          currentMoveOpponent: (
            <div>
              <div>
                {`${opponent.name} used ${randomOffensiveMove} to attack ${attacker.name}.`}
              </div>
              <div>
              {`${attacker.name} blocked ${opponent.name}!`}
              </div>
              <div>
              {`No damage taken!`}
              </div>
            </div>
            )
        });
      }
      // this.clearMove();
    }, 2000)




  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push('/players');
      return null;
    }

    const { player, opponents, playerHealth, opponentHealth, currentMovePlayer, currentMoveOpponent } = this.state;
    const { randomAttack } = this;
    const opponent = opponents.length ? opponents[0] : null;

    return (
      <div>
        <h2>{player.name} vs. {opponents[0].name}</h2>
        <button onClick={() => randomAttack(player, opponent)} disabled={ opponentHealth <= 0 || playerHealth <= 0 }>Attack!</button>
        <h4>{player.name}'s Health: {playerHealth}</h4>
        <h4>{opponent.name}'s Health: {opponentHealth}</h4>
        <h5>{currentMovePlayer ? currentMovePlayer : null}</h5>
        <h5>{currentMoveOpponent ? currentMoveOpponent : null}</h5>
        <h2>{playerHealth <= 0 ? 'YOU LOSE!' : opponentHealth <= 0 ? 'YOU WIN!' : null}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opponents: state.players,
    offense: {
      'Light Punch': 5,
      'Hard Punch': 7,
      'Upper Cut': 10,
      'Light Kick': 6,
      'Hard Kick': 8,
      'Roundhouse Kick': 11,
      'Special Move': 15
    }
  }
}

export default connect(mapStateToProps)(Arena);
