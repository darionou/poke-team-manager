import { Pool } from 'pg';
import { getRepository as getTeamRepository } from '../repositories/team';
import mapper from '../helpers/mapper';
import { FilterTeamRequest, TeamRequest } from '../helpers/types';

export default function getService(postgres: Pool) {
  const teamRepository = getTeamRepository(postgres);

  return {
    async getTeams() {
      const result = await teamRepository.getAllTeams();
      return result.map((e) => mapper(e).toTeamRead());
    },
    async createTeam(body: TeamRequest) {
      const result = await teamRepository.createTeam(mapper(body).toTeamWrite());
      return mapper(result).toTeamRead();
    },
    async getTeamWithPokemons(teamId: number) {
      const result = await teamRepository.getTeamWithPokemons(teamId);
      return {
        team: mapper(result.team).toTeamRead(),
        pokemons: result.pokemons.map((e) => mapper(e).toPokemonRead()),
      };
    },
    async updateTeam(teamId: number, body: TeamRequest) {
      const result = await teamRepository.updateTeam(teamId, mapper(body).toTeamWrite());
      return mapper(result).toTeamRead();
    },
    async getTeamsPokemonsFiltered(filters: FilterTeamRequest) {
      const result = await teamRepository.filterTeams(filters);
      return result.map((team) => ({
        team: mapper(team.team).toTeamRead(),
        pokemons: team.pokemons.map((e) => mapper(e).toPokemonRead()),
      }));
    },
  };
}
