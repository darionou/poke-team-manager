import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export enum Source {
  body = 'body',
  query = 'query',
  params = 'params'
}

type SourceType = 'body' | 'query' | 'params';

export function validate(schema: Schema, source: SourceType = Source.body) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    next();
  };
}
