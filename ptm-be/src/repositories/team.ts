import { Pool } from 'pg';
import NodeCache from 'node-cache';
import extractVariables from '../helpers/postgres';
import { FilterTeamRequest, FilterTeamResponse } from '../helpers/types';

const cache = new NodeCache({ stdTTL: Number(process.env.NODE_CACHE_TTL) || 2 });

export type TeamWrite = {
    name: string;
}

export type TeamRead = {
    id: number;
    name: string;
    created_at: Date;
}

type Team = TeamWrite & TeamRead;

type TeamTableRow = {
    id: number;
    name: string;
    created_at: Date;
}

type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    sprite: string;
    abilities: string;
    types: string;
    team_id: number | null;
    external_id: number;
    created_at?: Date;
}

type PokemonTableRow = {
  id: number;
  pokemon_name: string;
  base_experience: number;
  sprite: string;
  abilities: string;
  types: string;
  team_id: number | null;
  external_id: number;
  created_at?: Date;
}

function tableRowToTeam(row: TeamTableRow): Team {
  return {
    id: row.id,
    name: row.name,
    created_at: row.created_at,
  };
}

function tableRowToPokemon(row: PokemonTableRow): Pokemon {
  return {
    created_at: row.created_at,
    external_id: row.external_id,
    name: row.pokemon_name,
    base_experience: row.base_experience,
    sprite: row.sprite,
    abilities: row.abilities,
    types: row.types,
    team_id: row.team_id,
    id: row.id,
  };
}

function teamToTableRow(team: TeamWrite) {
  return {
    name: team.name,
  };
}

function filterToTableRow(filters: FilterTeamRequest) {
  return {
    type: filters.type || null,
    sort_by: filters.sortBy || 'created_at',
    offset: filters.offset || 0,
    limit: filters.limit || 10,
    order: filters.order || 'desc',
  };
}

export function getRepository(postgres: Pool) {
  return {
    async getTeamById(id: number): Promise<Team | null> {
      const queryString = 'SELECT * FROM team WHERE id = $1';
      const result = await postgres.query(queryString, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return tableRowToTeam(result.rows[0]);
    },
    async getAllTeams(): Promise<Team[]> {
      const queryString = 'SELECT * FROM team';
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
        INSERT INTO team (${columns.join(',')})
        VALUES(${variables})
        RETURNING *;
      `;
      const result = await postgres.query(queryString, queryValues);
      const newTeam = tableRowToTeam(result.rows[0]);

      return newTeam;
    },
    async updateTeam(teamId: number, team: TeamWrite): Promise<Team> {
      const tableRow = teamToTableRow(team);
      const { columns, values: queryValues } = extractVariables(tableRow);

      const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');

      const queryString = `
        UPDATE team
        SET ${setClause}
        WHERE id = $${queryValues.length + 1}
        RETURNING *;
      `;
      const result = await postgres.query(queryString, [...queryValues, teamId]);

      if (result.rows.length === 0) {
        throw new Error('Team not found');
      }
      return tableRowToTeam(result.rows[0]);
    },
    async getTeamWithPokemons(teamId: number): Promise<{ team: Team, pokemons: Pokemon[] }> {
      const queryString = `
        SELECT t.*, tp.id AS pokemon_id, tp.name AS pokemon_name, tp.base_experience, tp.sprite, tp.abilities, tp.types, tp.external_id as external_id
        FROM team t
        LEFT JOIN team_pokemon tp ON t.id = tp.team_id
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
        .map(row => (tableRowToPokemon(row)));
      return { team, pokemons };
    },

    async filterTeams(filters: FilterTeamRequest): Promise<
    FilterTeamResponse[]> {
      const cacheKey = 'filterTeams';
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return cachedData as FilterTeamResponse[];
      }
      const {
        type, sort_by, order, offset, limit,
      } = filterToTableRow(filters);

      let subQueryString = `
        SELECT t.id as team_id
        FROM team t
      `;

      const subQueryValues = [];
      const subQueryConditions = [];

      if (type) {
        subQueryConditions.push(`
        EXISTS (
          SELECT 1 FROM team_pokemon tp 
          WHERE tp.team_id = t.id 
          AND tp.types ILIKE $${subQueryValues.length + 1}
        )`);
        subQueryValues.push(`%${type}%`);
      }

      if (subQueryConditions.length > 0) {
        subQueryString += ` WHERE ${subQueryConditions.join(' AND ')}`;
      }

      subQueryString += ` ORDER BY t.${sort_by} ${order.toUpperCase()}`;

      if (limit) {
        subQueryString += ` LIMIT $${subQueryValues.length + 1}`;
        subQueryValues.push(limit);
      }

      if (offset) {
        subQueryString += ` OFFSET $${subQueryValues.length + 1}`;
        subQueryValues.push(offset);
      }

      const queryString = `
        SELECT t.id as id, t.created_at, t.name, tp.id AS pokemon_id, 
        tp.name AS pokemon_name, tp.base_experience, tp.sprite, tp.abilities, 
        tp.types, tp.external_id as external_id
        FROM (${subQueryString}) sub
        JOIN team t ON t.id = sub.team_id
        LEFT JOIN team_pokemon tp ON t.id = tp.team_id
        ORDER BY t.${sort_by} ${order.toUpperCase()}
      `;

      const result = await postgres.query(queryString, subQueryValues);

      const teamsMap = new Map<number, {
        team: TeamRead,
        pokemons: Pokemon[] }>();

      result.rows.forEach(row => {
        if (!teamsMap.has(row.id)) {
          teamsMap.set(row.id, {
            team: tableRowToTeam(row),
            pokemons: [],
          });
        }

        if (row.pokemon_id) {
          teamsMap.get(row.id)?.pokemons.push(tableRowToPokemon(row));
        }
      });

      const mappedResult = Array.from(teamsMap.values());
      cache.set(cacheKey, mappedResult);

      return mappedResult;
    },
  };
}
