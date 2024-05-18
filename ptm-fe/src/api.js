import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const createTeam = (teamName) => axios.post(`${API_URL}/teams`, { name: teamName });

export const getTeams = () => axios.get(`${API_URL}/teams`);

export const getTeamById = (teamId) => axios.get(`${API_URL}/teams/${teamId}`);

export const updateTeam = (teamId, teamData) => axios.patch(`${API_URL}/teams/${teamId}`, teamData);

export const addPokemonsToTeam = (teamId, pokemon) => axios.post(`${API_URL}/pokemons/team/${teamId}`, {
  ...pokemon,
});

export const getPokemon = (pokemonId) => axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

export const getFilteredTeams = (filters) => {
  const {
    type, sortBy, offset, limit, order,
  } = filters;
  return axios.get(`${API_URL}/teams/filter`, {
    params: {
      type,
      sortBy,
      offset,
      limit,
      order,
    },
  });
};
