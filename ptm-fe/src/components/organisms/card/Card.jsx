/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import CollapsedCard from '../../molecules/collapsed-card/CollapsedCard';
import ExpandedCard from '../../molecules/expanded-card/ExpandedCard';

function Card({
  isOpen = false,
  expandedPokemon,
  togglePokemonCard,
  index,
  pokemon,
}) {
  if (isOpen) {
    return (
      <ExpandedCard
        onClick={() => togglePokemonCard(expandedPokemon)}
        pokemon={expandedPokemon}
      />
    );
  }

  const selected = pokemon === expandedPokemon;

  if (selected) {
    return (
      <CollapsedCard
        index={index}
        onClick={togglePokemonCard}
        selected={selected}
        pokemon={pokemon}
      />

    );
  }
  return (
    <CollapsedCard
      index={index}
      onClick={togglePokemonCard}
      selected={selected}
      pokemon={pokemon}
    />
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
