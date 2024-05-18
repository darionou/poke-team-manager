/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
export class EntityNotFound extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFound extends Error {
  constructor(message: string) {
    super(message);
  }
}
