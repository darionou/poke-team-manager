import { Pool } from 'pg';
import { getRepository as getPokemonRepository } from '../repositories/pokemon';
import mapper from '../helpers/mapper';
import { PokemonRequest, PokemonResponse } from '../helpers/types';
import { NotFound } from '../libs/errors';

export default function getService(postgres: Pool) {
  const pokemonRepository = getPokemonRepository(postgres);
  return {
    async getPokemons(): Promise<PokemonResponse[]> {
      const result = await pokemonRepository.getAllPokemons();
      return result.map((e) => mapper(e).toPokemonRead());
    },
    async createPokemon(body: PokemonRequest): Promise<PokemonResponse> {
      const result = await pokemonRepository.createPokemon(mapper(body).toPokemonWrite());
      return mapper(result).toPokemonRead();
    },
    async getPokemonById(pokemonId: number): Promise<PokemonResponse> {
      const result = await pokemonRepository.getPokemonById(pokemonId);
      if (!result) throw new NotFound('Pokemon not found');
      return mapper(result).toPokemonRead();
    },
    async updatePokemon(pokemonId: number, body: PokemonRequest): Promise<PokemonResponse> {
      const result = await pokemonRepository.updatePokemon(
        pokemonId, mapper(body).toPokemonWrite(),
      );
      if (!result) throw new NotFound('Pokemon not found');
      return mapper(result).toPokemonRead();
    },
    async createAndAssignPokemon(teamId: number, body: PokemonRequest): Promise<PokemonResponse> {
      const result = await pokemonRepository.createPokemonAndAssignToTeam(
        mapper(body).toPokemonWrite(), teamId,
      );
      return mapper(result).toPokemonRead();
    },
    async assignPokemonToTeam(teamId: number, pokemonId: number): Promise<PokemonResponse> {
      const result = await pokemonRepository.assignPokemonToTeam(pokemonId, teamId);
      return mapper(result).toPokemonRead();
    },
  };
}
