import axios from "axios"
import { Pokemon, PokemonImages } from "../models/pokemon.model"

export default class {
  async search(id: number): Promise<Pokemon>{
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const { name, base_experience, height, weight, sprites } = data

    return {
      id,
      name,
      base_experience,
      height,
      weight,
      images: {
        normal: sprites.front_default,
        shiny: sprites.front_shiny
      }
    }
  }
}
