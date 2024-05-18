import { Pokemon } from '../repositories/pokemon';
import { TeamRead } from '../repositories/team';

export type PokemonRequest = {
    name: string;
    baseExperience: number;
    sprite: string;
    abilities: string;
    types: string;
}

export type PokemonResponse = {
    id: string;
    externalId: string,
    name: string;
    baseExperience: number;
    sprite: string;
    abilities: string;
    types: string;
    createdAt: number;
}

export type TeamRequest = {
    name: string;
}

export type FilterTeamRequest = {
    type?: string;
    limit?: number;
    offset?: number;
    sortBy?: string;
    order?: string;
}

export type FilterTeamResponse = {
    team: TeamRead,
    pokemons: Pokemon[]
}

export type TeamResponse = {
    id: number,
    name: string,
    createdAt: string,
}
