import { Pool } from 'pg';
import extractVariables from '../helpers/postgres';

export type PokemonWrite = {
    external_id: number,
    name: string;
    base_experience: number;
    sprite: string;
    abilities: string;
    types: string;
}

type PokemonRead = {
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

export type Pokemon = PokemonWrite & PokemonRead;

type PokemonTableRow = {
    id: number;
    name: string;
    base_experience: number;
    sprite: string;
    abilities: string;
    types: string;
    team_id: number | null;
    external_id: number;
    created_at?: Date,
}

function tableRowToPokemon(row: PokemonTableRow): Pokemon {
  return {
    external_id: row.external_id,
    name: row.name,
    base_experience: row.base_experience,
    sprite: row.sprite,
    abilities: row.abilities,
    types: row.types,
    team_id: row.team_id,
    id: row.id,
    created_at: row.created_at,
  };
}

function pokemonToTableRow(pokemon: PokemonWrite) {
  return {
    external_id: pokemon.external_id,
    name: pokemon.name,
    base_experience: pokemon.base_experience,
    sprite: pokemon.sprite,
    abilities: pokemon.abilities,
    types: pokemon.types,
  };
}

export function getRepository(postgres: Pool) {
  return {
    async getAllPokemons(): Promise<Pokemon[]> {
      const queryString = 'SELECT * FROM team_pokemon';
      const result = await postgres.query(queryString);
      return result.rows.map(tableRowToPokemon);
    },
    async createPokemon(pokemon: PokemonWrite): Promise<Pokemon> {
      const tableRow = pokemonToTableRow(pokemon);

      const {
        columns,
        variables,
        values: queryValues,
      } = extractVariables(tableRow);

      const queryString = `
                INSERT INTO team_pokemon (${columns.join(',')})
                VALUES(${variables})
                RETURNING *;
        `;

      const result = await postgres.query(queryString, queryValues);
      const newPokemon = tableRowToPokemon(result.rows[0]);

      return newPokemon;
    },
    async getPokemonById(pokemonId: number): Promise<Pokemon> {
      const queryString = 'SELECT * FROM team_pokemon WHERE id = $1';
      const result = await postgres.query(queryString, [pokemonId]);
      if (result.rows.length === 0) {
        throw new Error('Pokemon not found');
      }
      return tableRowToPokemon(result.rows[0]);
    },
    async updatePokemon(pokemonId: number, pokemon: PokemonWrite): Promise<Pokemon> {
      const tableRow = pokemonToTableRow(pokemon);

      const {
        columns,
        variables,
        values: queryValues,
      } = extractVariables(tableRow);

      const queryString = `
                UPDATE team_pokemon SET (${columns.join(',')}) = (${variables})
                WHERE id = $${queryValues.length + 1}
                RETURNING *;
        `;

      const result = await postgres.query(queryString, [...queryValues, pokemonId]);
      if (result.rows.length === 0) {
        throw new Error('Pokemon not found');
      }
      return tableRowToPokemon(result.rows[0]);
    },
    async createPokemonAndAssignToTeam(pokemon: PokemonWrite, teamId: number): Promise<Pokemon> {
      const tableRow = pokemonToTableRow(pokemon);
      const { columns, variables, values: queryValues } = extractVariables(tableRow);
      const queryString = `
                INSERT INTO team_pokemon (${columns.join(',')}, team_id)
                VALUES(${variables}, $${queryValues.length + 1})
                RETURNING *;
            `;
      const result = await postgres.query(queryString, [...queryValues, teamId]);
      const newPokemon = tableRowToPokemon(result.rows[0]);
      return newPokemon;
    },
    async assignPokemonToTeam(pokemonId: number, teamId: number): Promise<Pokemon> {
      const queryString = `
                UPDATE team_pokemon 
                SET team_id = $1 
                WHERE id = $2;
      `;
      const result = await postgres.query(queryString, [teamId, pokemonId]);
      return tableRowToPokemon(result.rows[0]);
    },
    async getPokemonsByTeamId(teamId: number): Promise<Pokemon[]> {
      const queryString = `
                SELECT * FROM team_pokemon
                WHERE team_id = $1;
            `;
      const result = await postgres.query(queryString, [teamId]);
      return result.rows.map(tableRowToPokemon);
    },
  };
}
