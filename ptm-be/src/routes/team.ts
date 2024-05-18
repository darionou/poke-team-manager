import { Router } from 'express';
import {
  getAllTeams,
  createTeam,
  getTeamWithPokemons,
  updateTeam,
  getTeamsWithPokemonsFiltered,
} from '../controllers/team';
import { validate, Source } from '../middleware/validate';
import { createTeamSchema, filterTeamsSchema, updateTeamSchema } from '../validations/team';

const router = Router();

router.get('/', getAllTeams);
router.post('/', validate(createTeamSchema), createTeam);
router.get('/filter', validate(filterTeamsSchema, Source.query), getTeamsWithPokemonsFiltered);
router.get('/:teamId', getTeamWithPokemons);
router.patch('/:teamId', validate(updateTeamSchema), updateTeam);

export default router;
