import { Request, Response } from 'express';
import { getService as getTeamService } from '../services/team';
import { getDbInstance } from '../config/database';

const postgres = getDbInstance();
const teamService = getTeamService(postgres);

export const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getTeams();
        res.json(teams);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const createTeam = async (req: Request, res: Response) => {
    try {
        const newTeam = await teamService.createTeams(req.body);
        res.json(newTeam);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export const getTeamWithPokemons = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        const teamWithPokemons = await teamService.getTeamWithPokemons(Number(teamId));
        res.json(teamWithPokemons);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unexpected error occurred');
        }
    }
};
