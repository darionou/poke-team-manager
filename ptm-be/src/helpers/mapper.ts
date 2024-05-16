import { PokemonWrite } from "../repositories/pokemon"
import { TeamWrite } from "../repositories/team"

export function mapper (body: any) {
    return {
        toPokemonWrite(): PokemonWrite {
            return {
                name: body.name,
                base_experience: body.baseExperience,
                sprite: body.sprite,
                abilities: body.abilities,
                types: body.types,
            }
        },
        toTeamWrite(): TeamWrite {
            return {
                name: body.name,
            }
        }
    }
}