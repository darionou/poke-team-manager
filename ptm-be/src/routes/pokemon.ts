import { Router } from 'express';
import {
    getAllPokemons,
    createPokemon,
    getPokemonById,
    updatePokemon,
    createAndAssignPokemonToTeam,
    assignPokemonToTeam,
} from '../controllers/pokemon';

const router = Router();

router.get('/', getAllPokemons);
router.post('/', createPokemon);
router.get('/:pokemonId', getPokemonById);
router.put('/:pokemonId', updatePokemon);
router.post('/team/:teamId', createAndAssignPokemonToTeam);
router.patch('/team/:teamId', assignPokemonToTeam);

export default router;


