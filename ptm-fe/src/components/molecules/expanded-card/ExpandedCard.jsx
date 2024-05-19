import React from 'react';

import './ExpandedCard.css';

function ExpandedCard({
  onClick, pokemon,
}) {
  return (
    <div
      className="pokemon-card expanded"
      onClick={() => onClick(pokemon)}
    >
      <h2>Hai catturato:</h2>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>
        Base Experience:
        {pokemon.baseExperience}
      </p>
      <p>
        Abilities:
        {pokemon.abilities}
      </p>
      <p>
        Types:
        {pokemon.types}
      </p>
    </div>
  );
}

export default ExpandedCard;
