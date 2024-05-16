import { Router } from 'express';
import {
    getAllTeams,
    createTeam,
    getTeamWithPokemons
} from '../controllers/team';

const router = Router();

router.get('/', getAllTeams);
router.post('/', createTeam);
router.get('/:teamId', getTeamWithPokemons);

export default router;