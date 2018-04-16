export const attack = (opponent) => {
  console.log('ATTACKED', opponent.name)
  opponent.health = opponent.health - 10;
  return opponent.health;
}

