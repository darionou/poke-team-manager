import React from 'react';

import './CollapsedCard.css';

function CollapsedCard({
  onClick, pokemon, index, selected,
}) {
  return (
    <div
      className={`pokemon-card ${selected ? 'collapsed-selected' : 'collapsed'}`}
      key={index}
      onClick={() => onClick(pokemon)}
    >
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default CollapsedCard;
