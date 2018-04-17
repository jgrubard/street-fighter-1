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
      playerAttackPhrase: '',
      opponentAttackPhrase: '',
      playerBlockStatus: '',
      opponentBlockStatus: '',
      playerDamageTaken: '',
      opponentDamageTaken: ''
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

    this.setState({ playerAttackPhrase: '', opponentAttackPhrase: '' })

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

          playerBlockStatus: '',
          playerDamageTaken: '',
          opponentAttackPhrase: '',

          opponentHealth: opponentHealth - offense[randomOffensiveMove],
          playerAttackPhrase: `${attacker.name} used ${randomOffensiveMove} to attack ${opponent.name}.`,
          opponentBlockStatus: `${opponent.name} could not block ${attacker.name}.`,
          opponentDamageTaken: `${offense[randomOffensiveMove]} damage points sustained`
        });
      } else {
        this.setState({

          playerBlockStatus: '',
          playerDamageTaken: '',
          opponentAttackPhrase: '',
          // opponentHealth: opponentHealth - offense[randomOffensiveMove],
          playerAttackPhrase: `${attacker.name} used ${randomOffensiveMove} to attack ${opponent.name}.`,
          opponentBlockStatus: `${opponent.name} blocked ${attacker.name}!`,
          opponentDamageTaken: 'No damage taken!'
        });
      }
      // this.clearMove();

    randomOffensiveMove = this.generateMove()[0];
    block = this.generateMove()[1];


    setTimeout(() => {

      // this.setState({ opponentAttackPhrase: '' })

      if (!block) {



        this.setState({

          opponentBlockStatus: '',
          opponentDamageTaken: '',
          playerAttackPhrase: '',

          playerHealth: playerHealth - offense[randomOffensiveMove],
          opponentAttackPhrase: `${opponent.name} used ${randomOffensiveMove} to attack ${attacker.name}.`,
          playerBlockStatus: `${attacker.name} could not block ${opponent.name}.`,
          playerDamageTaken: `${offense[randomOffensiveMove]} damage points sustained`
        });
      } else {
        this.setState({

          opponentBlockStatus: '',
          opponentDamageTaken: '',
          playerAttackPhrase: '',
          // playerHealth: playerHealth - offense[randomOffensiveMove],
          opponentAttackPhrase: `${opponent.name} used ${randomOffensiveMove} to attack ${attacker.name}.`,
          playerBlockStatus: `${attacker.name} blocked ${opponent.name}!`,
          playerDamageTaken: 'No damage taken!'
        });
      }




      // this.clearMove();
    }, 5000)




  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push('/players');
      return null;
    }

    const { player, opponents, playerHealth, opponentHealth, playerAttackPhrase, opponentAttackPhrase, playerBlockStatus, opponentBlockStatus, opponentDamageTaken, playerDamageTaken } = this.state;
    const { randomAttack } = this;
    const opponent = opponents.length ? opponents[0] : null;

    return (
      <div>
        <h2>{player.name} vs. {opponents[0].name}</h2>
        <button
          onClick={() => randomAttack(player, opponent)}
          disabled={ opponentHealth <= 0 || playerHealth <= 0 }
          className='btn btn-warning'
        >Attack!</button>
        <div className='row'>
          <div className='col'>
            <img src={player.imageUrl} className='battle-image' />
            <h4>Health: {playerHealth}</h4>
            <h5>{playerAttackPhrase ? playerAttackPhrase : null}</h5>

            <h5>{playerBlockStatus ? playerBlockStatus : null}</h5>
            <h5 style={playerDamageTaken === 'No damage taken!' ? {'color':'green'} : {'color':'red'}}>{playerDamageTaken ? playerDamageTaken : null}</h5>

{/*            <h5>{opponentBlockStatus ? opponentBlockStatus : null}</h5>
            <h5>{opponentDamageTaken ? opponentDamageTaken : null}</h5>*/}
          </div>
          <div className='col'>
            <img src='/images/vs.png' className='vs' />
          </div>
          <div className='col'>
            <img src={opponent.imageUrl} className='battle-image' />
            <h4>Health: {opponentHealth}</h4>
            <h5>{opponentAttackPhrase ? opponentAttackPhrase : null}</h5>

            <h5>{opponentBlockStatus ? opponentBlockStatus : null}</h5>
            <h5 style={opponentDamageTaken === 'No damage taken!' ? {'color':'green'} : {'color':'red'}}>{opponentDamageTaken ? opponentDamageTaken : null}</h5>

{/*            <h5>{playerBlockStatus ? playerBlockStatus : null}</h5>
            <h5>{playerDamageTaken ? playerDamageTaken : null}</h5>*/}
          </div>
        </div>
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
