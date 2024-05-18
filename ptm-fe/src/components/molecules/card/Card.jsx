/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({
  isOpen = false,
  expandedPokemon,
  togglePokemonCard,
  index,
  pokemon,
}) {
  if (isOpen) {
    return (
      <div
        className="pokemon-card expanded"
        onClick={() => togglePokemonCard(expandedPokemon)}
      >
        <h2>Hai catturato:</h2>
        <h3>{expandedPokemon.name}</h3>
        <img src={expandedPokemon.sprite} alt={expandedPokemon.name} />
        <p>
          Base Experience:
          {expandedPokemon.baseExperience}
        </p>
        <p>
          Abilities:
          {expandedPokemon.abilities}
        </p>
        <p>
          Types:
          {expandedPokemon.types}
        </p>
      </div>
    );
  }

  if (pokemon === expandedPokemon) {
    return (
      <div
        className="pokemon-card collapsed-selected"
        key={index}
        onClick={() => togglePokemonCard(pokemon)}
      >
        <h3>{pokemon.name}</h3>
      </div>
    );
  }
  return (
    <div
      className="pokemon-card collapsed"
      key={index}
      onClick={() => togglePokemonCard(pokemon)}
    >
      <h3>{pokemon.name}</h3>
    </div>
  );
}

Card.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  expandedPokemon: PropTypes.object,
  togglePokemonCard: PropTypes.func,
  index: PropTypes.number,
  pokemon: PropTypes.object,
};

export default Card;
