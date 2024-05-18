import { PokemonWrite } from '../repositories/pokemon';
import { TeamWrite } from '../repositories/team';
import { PokemonResponse, TeamResponse } from './types';

export default function mapper(body: any) {
  return {
    toPokemonWrite(): PokemonWrite {
      return {
        external_id: body.externalId,
        name: body.name,
        base_experience: body.baseExperience,
        sprite: body.sprite,
        abilities: body.abilities,
        types: body.types,
      };
    },
    toTeamWrite(): TeamWrite {
      return {
        name: body.name,
      };
    },
    toPokemonRead(): PokemonResponse {
      return {
        externalId: body.external_id,
        name: body.name,
        baseExperience: body.base_experience,
        sprite: body.sprite,
        abilities: body.abilities,
        types: body.types,
        createdAt: body.created_at,
        id: body.id,
      };
    },
    toTeamRead(): TeamResponse {
      return {
        id: body.id,
        name: body.name,
        createdAt: body.created_at,
      };
    },
  };
}
