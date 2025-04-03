import "./App.css";

import { useEffect, useState } from "react";

import axios from "axios";

interface Pokemon {
  name: string;
  image: string;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setErr(null);

      try {
        const response = await axios.get<{
          results: { name: string; url: string }[];
        }>("https://pokeapi.co/api/v2/pokemon?limit=20");

        const pokemonData = await Promise.all(
          response.data.results.map(async (poke) => {
            const details = await axios.get(poke.url);
            const imageUrl =
              details.data.sprites.front_default ||
              "https://via.placeholder.com/80";

            return {
              name: poke.name,
              image: imageUrl,
            };
          })
        );

        setPokemon(pokemonData);
      } catch (error) {
        setErr("Error al obtener los datos de Pokémon");
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (err) return <p style={{ color: "red" }}>{err}</p>;
  if (loading) return <p>Cargando Pokémon...</p>;

  return (
    <div className="app-container">
      <h2>Lista de Pokémon</h2>
      <div className="pokemon-container">
        {pokemon.map((poke, index) => (
          <div key={index} className="pokemon-card">
            <h3>{poke.name}</h3>
            <img src={poke.image} alt={poke.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
