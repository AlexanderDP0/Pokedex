import axios from "axios";

export interface Pokemon {
  name: string;
  image: string;
}

export const getPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get<{
      results: { name: string; url: string }[];
    }>("https://pokeapi.co/api/v2/pokemon");

    const pokemonData = await Promise.all(
      response.data.results.map(async (poke) => {
        const details = await axios.get(poke.url);
        const imageUrl =
          details.data.sprites.front_default ||
          "https://via.placeholder.com/80";

        return { name: poke.name, image: imageUrl };
      })
    );

    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
};
