import { Pool } from 'pg';
import getService from '../services/team';
import { getRepository } from '../repositories/team';

jest.mock('pg');
jest.mock('../src/repositories/team');

const mockPool = new Pool() as jest.Mocked<Pool>;

const mockRepository = {
  getAllTeams: jest.fn(),
  createTeam: jest.fn(),
  getTeamWithPokemons: jest.fn(),
  updateTeam: jest.fn(),
  filterTeams: jest.fn(),
};

(getRepository as jest.Mock).mockReturnValue(mockRepository);

jest.mock('../src/helpers/mapper', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((body) => ({
    toTeamRead: () => ({
      id: body.id,
      name: body.name,
      createdAt: body.created_at,
    }),
    toTeamWrite: () => ({
      name: body.name,
    }),
    toPokemonRead: () => ({
      id: body.id,
      name: body.name,
      baseExperience: body.base_experience,
      sprite: body.sprite,
      abilities: body.abilities,
      types: body.types,
      createdAt: body.created_at,
      externalId: body.external_id,
    }),
  })),
}));

describe('Team Service', () => {
  const service = getService(mockPool);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTeams', () => {
    it('should return a list of teams', async () => {
      const mockTeams = [
        { id: 1, name: 'Team 1', created_at: new Date() },
        { id: 2, name: 'Team 2', created_at: new Date() },
      ];

      mockRepository.getAllTeams.mockResolvedValue(mockTeams);

      const result = await service.getTeams();

      expect(mockRepository.getAllTeams).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTeams.map(team => ({
        id: team.id,
        name: team.name,
        createdAt: team.created_at,
      })));
    });
  });

  describe('createTeam', () => {
    it('should create a team and return it', async () => {
      const teamRequest = { name: 'New Team' };
      const mockTeam = { id: 1, name: 'New Team', created_at: new Date() };
      mockRepository.createTeam.mockResolvedValue(mockTeam);

      const result = await service.createTeam(teamRequest);

      expect(mockRepository.createTeam).toHaveBeenCalledWith({ name: teamRequest.name });
      expect(result).toEqual({
        id: mockTeam.id,
        name: mockTeam.name,
        createdAt: mockTeam.created_at,
      });
    });
  });

  describe('getTeamWithPokemons', () => {
    it('should return a team with its pokemons', async () => {
      const teamId = 1;
      const mockTeam = { id: 1, name: 'Team 1', created_at: new Date() };
      const mockPokemons = [
        {
          id: 1,
          name: 'Pikachu',
          base_experience: 112,
          sprite: 'sprite_url',
          abilities: 'Static, Lightning Rod',
          types: 'Electric',
          created_at: new Date(),
          external_id: 25,
        },
      ];

      mockRepository.getTeamWithPokemons.mockResolvedValue({
        team: mockTeam,
        pokemons: mockPokemons,
      });

      const result = await service.getTeamWithPokemons(teamId);

      expect(mockRepository.getTeamWithPokemons).toHaveBeenCalledWith(teamId);
      expect(result).toEqual({
        team: {
          id: mockTeam.id,
          name: mockTeam.name,
          createdAt: mockTeam.created_at,
        },
        pokemons: mockPokemons.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          baseExperience: pokemon.base_experience,
          sprite: pokemon.sprite,
          abilities: pokemon.abilities,
          types: pokemon.types,
          createdAt: pokemon.created_at,
          externalId: pokemon.external_id,
        })),
      });
    });
  });

  describe('updateTeam', () => {
    it('should update a team and return it', async () => {
      const teamId = 1;
      const teamRequest = { name: 'Updated Team' };
      const mockTeam = { id: 1, name: 'Updated Team', created_at: new Date() };
      mockRepository.updateTeam.mockResolvedValue(mockTeam);

      const result = await service.updateTeam(teamId, teamRequest);

      expect(mockRepository.updateTeam).toHaveBeenCalledWith(teamId, { name: teamRequest.name });
      expect(result).toEqual({
        id: mockTeam.id,
        name: mockTeam.name,
        createdAt: mockTeam.created_at,
      });
    });
  });

  describe('getTeamsPokemonsFiltered', () => {
    it('should return filtered teams with their pokemons', async () => {
      const filters = {
        type: 'Electric',
        limit: 10,
        offset: 0,
        sortBy: 'created_at',
        order: 'asc',
      };
      const mockTeams = [
        {
          team: { id: 1, name: 'Team 1', created_at: new Date() },
          pokemons: [
            {
              id: 1,
              name: 'Pikachu',
              base_experience: 112,
              sprite: 'sprite_url',
              abilities: 'Static, Lightning Rod',
              types: 'Electric',
              created_at: new Date(),
              external_id: 25,
            },
          ],
        },
      ];

      mockRepository.filterTeams.mockResolvedValue(mockTeams);

      const result = await service.getTeamsPokemonsFiltered(filters);

      expect(mockRepository.filterTeams).toHaveBeenCalledWith(filters);
      expect(result).toEqual(
        mockTeams.map(team => ({
          team: {
            id: team.team.id,
            name: team.team.name,
            createdAt: team.team.created_at,
          },
          pokemons: team.pokemons.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            baseExperience: pokemon.base_experience,
            sprite: pokemon.sprite,
            abilities: pokemon.abilities,
            types: pokemon.types,
            createdAt: pokemon.created_at,
            externalId: pokemon.external_id,
          })),
        })),
      );
    });
  });
});
