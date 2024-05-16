import { Router } from 'express';
import {
    getAllTeams,
    createTeam,
    getTeamWithPokemons
} from '../controllers/team';
import { validate } from '../middleware/validate';
import { createTeamSchema } from '../validations/team';



const router = Router();

router.get('/', getAllTeams);
router.post('/', validate(createTeamSchema), createTeam);
router.get('/:teamId', getTeamWithPokemons);

export default router;