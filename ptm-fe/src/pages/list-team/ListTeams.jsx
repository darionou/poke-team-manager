import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeams, getTeamById } from '../../api';
import './ListTeams.css';
import teamsImage from '../../assets/img/teams.jpg';

function ListTeams() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        const teamData = response.data;
        const teamDetailsPromises = teamData.map(
          (team) => getTeamById(team.id).then((res) => res.data),
        );

        const teamsWithDetails = await Promise.all(teamDetailsPromises);
        // Sort teams by creation date if the API provides it, assuming "created_at" exists
        const sortedTeams = teamsWithDetails.sort(
          (a, b) => new Date(b.team.createdAt) - new Date(a.team.createdAt),
        );

        // Collect all unique types
        const typesSet = new Set();
        sortedTeams.forEach((team) => {
          team.pokemons.forEach((pokemon) => {
            pokemon.types.split(',').forEach((type) => typesSet.add(type.trim()));
          });
        });

        setAvailableTypes([...typesSet]);

        setTeams(sortedTeams);
        setFilteredTeams(sortedTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}/edit`);
  };

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    if (type) {
      setFilteredTeams(
        teams.filter((team) => team.pokemons.some((pokemon) => pokemon.types.includes(type))),
      );
    } else {
      setFilteredTeams(teams);
    }
  };

  const handleSelectChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    if (type) {
      setFilteredTeams(
        teams.filter((team) => team.pokemons.some((pokemon) => pokemon.types.includes(type))),
      );
    } else {
      setFilteredTeams(teams);
    }
  };

  return (
    <div className="list-teams-container">
      <h1>Team Listing</h1>
      <img src={teamsImage} alt="Pokémon Banner" className="banner-image" />
      <div className="filter-container">
        <div className="filter-multiselect">
          <label htmlFor="type-select">
            Filter by Type:
            <select id="type-select" value={filterType} onChange={handleSelectChange}>
              <option value="">All Types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="type-filter">
            or Enter Type:
            <input
              id="type-filter"
              type="text"
              value={filterType}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>
      <div className="teams-list">
        {console.log('filteredTeams: ', filteredTeams)}
        {filteredTeams.map((team) => (
          <div
            className="team-card"
            key={team.team.id}
            onClick={() => handleTeamClick(team.team.id)}
          >
            <h2>{team.team.name}</h2>
            <div className="pokemon-images">
              {team.pokemons.map((pokemon) => (
                <img
                  key={pokemon.id}
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
              ))}
            </div>
            <p>
              Total Base Experience:
              {' '}
              {
              team.pokemons.reduce((total, p) => total + p.baseExperience, 0)
}
            </p>
            <p>
              Types:
              {' '}
              {[...new Set(team.pokemons.flatMap((p) => p.types.split(',')))].join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListTeams;
