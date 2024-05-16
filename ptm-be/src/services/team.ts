import { Pool } from "pg";
import { getRepository as getTeamRepository } from '../repositories/team';
import { mapper } from "../helpers/mapper";
import { TeamRequest } from "../helpers/types";

export function getService(postgres: Pool) {
    const teamRepository = getTeamRepository(postgres);

    return {
        async getTeams() {
            const result = await teamRepository.getAllTeams();
            return result;
        },
        async createTeams(body: TeamRequest) {
            const result = await teamRepository.createTeam(mapper(body).toTeamWrite());
            return result;
        },
        async getTeamWithPokemons(teamId: number) {
            const result = await teamRepository.getTeamWithPokemons(teamId);
            return result;
        }
    }
}