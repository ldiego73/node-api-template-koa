import { ApolloError } from "apollo-server-koa";

export default class PokemonNotFoundError extends ApolloError {
  constructor(message) {
    super(message, 1000, {
      message
    });

    Object.defineProperty(this, 'name', { value: this.constructor.name });
  }
}
