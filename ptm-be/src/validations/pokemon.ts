import Joi from 'joi';

export const createPokemonSchema = Joi.object({
    name: Joi.string().required(),
    baseExperience: Joi.number().required(),
    sprite: Joi.string().required(),
    abilities: Joi.string().required(),
    types: Joi.string().required()
});

export const updatePokemonSchema = Joi.object({
    name: Joi.string().optional(),
    baseExperience: Joi.number().optional(),
    sprite: Joi.string().optional(),
    abilities: Joi.string().optional(),
    types: Joi.string().optional()
});

export const assignPokemonToTeamSchema = Joi.object({
    pokemonId: Joi.number().required()
});
