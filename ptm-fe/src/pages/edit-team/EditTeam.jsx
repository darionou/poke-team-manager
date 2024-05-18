/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getTeamById, getPokemon, updateTeam, addPokemonsToTeam,
} from '../../api';
import './EditTeam.css';
import oakImage from '../../assets/img/prof-oak.jpg';
import Card from '../../components/molecules/card/Card';

function EditTeam() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [expandedPokemon, setExpandedPokemon] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeamById(teamId);
        setTeam(response.data.team);
        setTeamName(response.data.team.name);
        setPokemons(response.data.pokemons);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, [teamId]);

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleUpdateTeamName = async () => {
    if (team) {
      try {
        await updateTeam(team.id, { name: teamName });
        setIsEditingName(false); // Exit edit mode after saving
        setTeamName(teamName);
      } catch (error) {
        console.error('Error updating team name:', error);
      }
    }
  };

  const handleAddPokemon = async () => {
    if (team) {
      try {
        const result = await getPokemon(Math.floor(Math.random() * 151) + 1);
        const pokemonData = result.data;
        const pokemon = {
          externalId: pokemonData.id,
          name: pokemonData.name,
          baseExperience: pokemonData.base_experience,
          sprite: pokemonData.sprites.front_default,
          abilities: pokemonData.abilities.map((ability) => ability.ability.name).join(', '),
          types: pokemonData.types.map((type) => type.type.name).join(', '),
        };

        setPokemons((prevPokemons) => [...prevPokemons, pokemon]);
        setExpandedPokemon(pokemon);
        await addPokemonsToTeam(team.id, pokemon);
      } catch (error) {
        console.error('Error adding Pokémon to team:', error);
      }
    }
  };

  const togglePokemonCard = (pokemon) => {
    setExpandedPokemon(expandedPokemon === pokemon ? null : pokemon);
  };

  return (
    <div className="edit-team-container">
      <h1>Edit Team</h1>
      <img src={oakImage} alt="Pokémon Banner" className="banner-oak-image-edit" />
      {team && (
        <>
          <div className="team-name-container">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={teamName}
                  onChange={handleTeamNameChange}
                  className="team-name-input"
                />
                <button
                  type="button"
                  className="update-team-name-button"
                  onClick={handleUpdateTeamName}
                >
                  Save Name
                </button>
              </>
            ) : (
              <>
                <h2>{teamName}</h2>
                <button
                  type="button"
                  className="edit-team-name-button"
                  onClick={() => setIsEditingName(true)}
                >
                  Edit Name
                </button>
              </>
            )}
          </div>
          <h3>Catch a Pokémon clicking the button below</h3>
          <button
            type="button"
            className="add-pokemon-button"
            onClick={handleAddPokemon}
          >
            Gotta Catch 'Em All
          </button>
          <div className="pokemon-layout">
            <div className="pokemon-list">
              {pokemons.map((pokemon, index) => (
                <Card
                  isOpen={false}
                  pokemon={pokemon}
                  index={index}
                  expandedPokemon={expandedPokemon}
                  togglePokemonCard={togglePokemonCard}
                />
              ))}
            </div>
            {expandedPokemon && (
            <Card
              isOpen={expandedPokemon}
              expandedPokemon={expandedPokemon}
              togglePokemonCard={togglePokemonCard}
              index={expandedPokemon.id}
            />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EditTeam;
