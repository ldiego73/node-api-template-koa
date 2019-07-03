export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  images: PokemonImages
}

export interface PokemonImages {
  normal: string
  shiny: string
}
