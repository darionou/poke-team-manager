import Joi from 'joi';

export const createTeamSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateTeamSchema = Joi.object({
  name: Joi.string().optional(),
});

export const filterTeamsSchema = Joi.object({
  type: Joi.string().optional(),
  offset: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
  sortBy: Joi.string().valid('created_at').optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
});
