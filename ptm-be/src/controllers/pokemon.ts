import { Request, Response } from 'express';
import {getDbInstance} from '../config/database';
import { getService } from '../services/pokemon';

const postgres = getDbInstance();
const pokemonService = getService(postgres);

export const getAllPokemons = async (req: Request, res: Response) => {
    try {
        const pokemons = await pokemonService.getPokemons();
        res.json(pokemons);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const createPokemon = async (req: Request, res: Response) => {
    try {
        const newPokemon = await pokemonService.createPokemon(req.body);
        res.json(newPokemon);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const getPokemonById = async (req: Request, res: Response) => {
    try {
        const { pokemonId } = req.params;
        const pokemon = await pokemonService.getPokemonById(Number(pokemonId));
        res.json(pokemon);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const updatePokemon = async (req: Request, res: Response) => {
    try {
        const { pokemonId } = req.params;
        const updatedPokemon = await pokemonService.updatePokemon(Number(pokemonId), req.body);
        res.json(updatedPokemon);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const addPokemonToTeam = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        const { pokemonId } = req.body;
        await pokemonService.assignPokemonToTeam(Number(teamId), Number(pokemonId));
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const createAndAssignPokemonToTeam = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        await pokemonService.createAndAssignPokemon(Number(teamId), req.body);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const assignPokemonToTeam = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        const { pokemonId } = req.body;
        await pokemonService.assignPokemonToTeam(Number(teamId), Number(pokemonId));
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};
