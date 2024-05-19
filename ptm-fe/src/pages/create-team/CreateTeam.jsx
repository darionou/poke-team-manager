/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import TeamForm from '../../components/organisms/form/TeamForm';
import { getPokemon, addPokemonsToTeam } from '../../api';
import './CreateTeam.css';
import oakImage from '../../assets/img/prof-oak.jpg';
import Card from '../../components/organisms/card/Card';
import GottaCatchEmAllButton from '../../components/atoms/GottaCatchEmAllButton';

function CreateTeam() {
  const [team, setTeam] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [expandedPokemon, setExpandedPokemon] = useState(null);

  const handleTeamCreated = (newTeam) => {
    setTeam(newTeam);
  };

  const handleAddPokemon = async () => {
    if (team) {
      try {
        const result = await getPokemon(Math.floor(Math.random() * 151) + 1);
        const pokemonData = result.data;
        const pokemon = {
          name: pokemonData.name,
          baseExperience: pokemonData.base_experience,
          sprite: pokemonData.sprites.front_default,
          abilities: pokemonData.abilities.map((ability) => ability.ability.name).join(', '),
          types: pokemonData.types.map((type) => type.type.name).join(', '),
          externalId: pokemonData.id,
        };

        await addPokemonsToTeam(team.id, pokemon);
        setPokemons((prevPokemons) => [...prevPokemons, pokemon]);
        setExpandedPokemon(pokemon);
      } catch (error) {
        console.error('Error adding Pokémon to team:', error);
      }
    }
  };

  const togglePokemonCard = (pokemon) => {
    setExpandedPokemon(expandedPokemon === pokemon ? null : pokemon);
  };

  return (
    <div className="create-team-container">
      <h1>Are you ready to join the competition?</h1>
      <img src={oakImage} alt="Pokémon Banner" className="banner-oak-image-create" />

      <div className="main-content">
        {!team ? (
          <div className="form-container">
            <h3>First: you have to choose a name for your team.</h3>
            <TeamForm onTeamCreated={handleTeamCreated} />
          </div>
        ) : (
          <>
            <h2>
              Team:
              {' '}
              {team.name}
            </h2>
            <h3>
              Ready to get your Pokémon? Press on the button below to catch one.
            </h3>
            {/* <button className="add-pokemon-button" onClick={handleAddPokemon}>
              Gotta Catch 'Em All
            </button> */}
            <GottaCatchEmAllButton onClick={handleAddPokemon} text={'Gotta Catch \'Em All'} />
            <div className="create-pokemon-layout">
              <div className="pokemon-list">
                {pokemons
                  .map((pokemon, index) => (
                    <Card
                      isOpen={false}
                      expandedPokemon={expandedPokemon}
                      togglePokemonCard={togglePokemonCard}
                      index={index}
                      pokemon={pokemon}
                    />
                  ))}
              </div>
              {
                expandedPokemon && (
                  <Card
                    isOpen={expandedPokemon}
                    expandedPokemon={expandedPokemon}
                    togglePokemonCard={togglePokemonCard}
                    index={expandedPokemon.id}
                  />
                )
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateTeam;
