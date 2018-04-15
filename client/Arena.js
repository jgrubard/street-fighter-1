import React from 'react';

const Arena = (props) => {
  if (!props.location.state) {
    props.history.push('/players');
    return null;
  }

  const { state } = props.location;
  const fighters = state.fighters;
  const player1 = fighters[0];
  const player2 = fighters[1];
  return (
    <div>
      <h2>BATTLE ARENA</h2>
      <h3>{player1.name} vs. {player2.name}</h3>

      {
        fighters.map(fighter => (
          <h1 key={fighter.id}>{fighter.name}'s Health: {fighter.health}</h1>
        ))
      }



    </div>
  );
}

export default Arena;
