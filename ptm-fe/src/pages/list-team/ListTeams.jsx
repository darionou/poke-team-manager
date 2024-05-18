import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilteredTeams } from '../../api';
import './ListTeams.css';
import teamsImage from '../../assets/img/teams.jpg';

function ListTeams() {
  const [teams, setTeams] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [availableTypes, setAvailableTypes] = useState([]);
  const navigate = useNavigate();

  const fetchFilteredTeams = async (filters) => {
    try {
      const response = await getFilteredTeams(filters);
      const teamsWithDetails = response.data;

      // Collect all unique types
      const typesSet = new Set();
      teamsWithDetails.forEach((team) => {
        team.pokemons.forEach((pokemon) => {
          pokemon.types.split(',').forEach((type) => typesSet.add(type.trim()));
        });
      });

      setAvailableTypes([...typesSet]);
      setTeams(teamsWithDetails);
    } catch (error) {
      console.error('Error fetching filtered teams:', error);
    }
  };

  useEffect(() => {
    fetchFilteredTeams({
      sortBy: 'created_at', order: 'desc', offset: 0, limit: 20,
    });
  }, []);

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}/edit`);
  };

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    fetchFilteredTeams({
      type,
      sortBy: 'created_at',
      order: 'desc',
      offset: 0,
      limit: 20,
    });
  };

  const handleSelectChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    fetchFilteredTeams({
      type,
      sortBy: 'created_at',
      order: 'desc',
      offset: 0,
      limit: 20,
    });
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
        {teams.map((team) => (
          <div
            className="team-card"
            key={team.team.team_id}
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
              {team.pokemons.reduce((total, p) => total + p.baseExperience, 0)}
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
