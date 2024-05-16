import { getRepository as getPokemonRepository } from '../repositories/pokemon';
import { Pool } from 'pg';
import { mapper } from '../helpers/mapper';
import { PokemonRequest } from '../helpers/types';

export function getService (postgres: Pool) {
    const pokemonRepository = getPokemonRepository(postgres);
    return {
        async getPokemons () {
            const result = await pokemonRepository.getAllPokemons();
            return result;
        },
        async createPokemon(body: PokemonRequest) {
            const result = await pokemonRepository.createPokemon(mapper(body).toPokemonWrite());
            return result;
        },
        async getPokemonById(pokemonId: number) {
            const result = await pokemonRepository.getPokemonById(pokemonId);
            return result;
        },
        async updatePokemon(pokemonId: number, body: PokemonRequest) {
            const result = await pokemonRepository.updatePokemon(pokemonId, mapper(body).toPokemonWrite());
            return result;
        },
        async createAndAssignPokemon(teamId: number, body: PokemonRequest) {
            const result = await pokemonRepository.createPokemonAndAssignToTeam(mapper(body).toPokemonWrite(), teamId);
            return result;
        },
        async assignPokemonToATeam(teamId: number, pokemonId: number) {
            const result = await pokemonRepository.assignPokemonToTeam(pokemonId, teamId);
            return result;
        }
    }
}