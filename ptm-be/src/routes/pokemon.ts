import { Router } from 'express';
import {
  getAllPokemons,
  createPokemon,
  getPokemonById,
  updatePokemon,
  createAndAssignPokemonToTeam,
  assignPokemonToTeam,
} from '../controllers/pokemon';

import { validate } from '../middleware/validate';
import { createPokemonSchema, assignPokemonToTeamSchema, updatePokemonSchema } from '../validations/pokemon';

const router = Router();

router.get('/', getAllPokemons);
router.post('/', validate(createPokemonSchema), createPokemon);
router.get('/:pokemonId', getPokemonById);
router.put('/:pokemonId', validate(updatePokemonSchema), updatePokemon);
router.post('/team/:teamId', validate(createPokemonSchema), createAndAssignPokemonToTeam);
router.patch('/team/:teamId', validate(assignPokemonToTeamSchema), assignPokemonToTeam);

export default router;
