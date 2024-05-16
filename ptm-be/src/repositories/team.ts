import { Pool } from "pg";
import { extractVariables } from "../helpers/postgres";

type Team = TeamWrite & TeamRead;

export type TeamWrite = {
    name: string;
}

type TeamRead = {
    id: number;
    name: string;
}

type TeamTableRow = {
    id: number;
    name: string;
}

type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    sprite: string;
    abilities: string;
    types: string;
    team_id: number | null;
}

function tableRowToTeam(row: TeamTableRow): Team {
    return {
        id: row.id,
        name: row.name,
    }
}

function teamToTableRow(team: TeamWrite) {
    return {
        name: team.name,
    }
}

export function getRepository(postgres: Pool) {
    return {
        async getAllTeams(): Promise<Team[]> {
            const queryString = `SELECT * FROM teams`;
            const result = await postgres.query(queryString);
            return result.rows.map(tableRowToTeam);
        },
        async createTeam(team: TeamWrite): Promise<Team> {
            const tableRow = teamToTableRow(team);

            const {
                columns,
                variables,
                values: queryValues,
            } = extractVariables(tableRow);

            const queryString = `
                INSERT INTO teams (${columns.join(",")})
                VALUES(${variables})
                RETURNING *;
        `;

            const result = await postgres.query(queryString, queryValues);
            const newTeam = tableRowToTeam(result.rows[0]);

            return newTeam;
        },
        async getTeamWithPokemons(teamId: number): Promise<{ team: Team, pokemons: Pokemon[] }> {
            const queryString = `
                SELECT t.*, p.id AS pokemon_id, p.name AS pokemon_name, p.base_experience, p.sprite, p.abilities, p.types 
                FROM teams t
                LEFT JOIN pokemons p ON t.id = p.team_id
                WHERE t.id = $1;
            `;
            const result = await postgres.query(queryString, [teamId]);

            if (result.rows.length === 0) {
                throw new Error('Team not found');
            }

            const teamRow = result.rows[0];
            const team = tableRowToTeam(teamRow);
            const pokemons = result.rows
                .filter(row => row.pokemon_id !== null)
                .map(row => ({
                    id: row.pokemon_id,
                    name: row.pokemon_name,
                    base_experience: row.base_experience,
                    sprite: row.sprite,
                    abilities: row.abilities,
                    types: row.types,
                    team_id: row.id
                }));

            return { team, pokemons };
        }
    }
}
