import axios from "axios"

export default class {
  async search(id) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const { name, base_experience, height, weight, sprites } = data
    const pokemon = {}

    pokemon.id = id
    pokemon.name = name
    pokemon.base_experience = base_experience
    pokemon.height = height
    pokemon.weight = weight
    pokemon.images = {
      normal: sprites.front_default,
      shiny: sprites.front_shiny,
    }

    return pokemon
  }
}
