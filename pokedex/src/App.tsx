import "./App.css";

import PokemonCard from "./components/pokemonCard";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const { pokemon, loading, err } = usePokemon();

  return (
    <div className="app-container">
      <h2>Lista de Pokémon</h2>

      {err && <p style={{ color: "red" }}>{err}</p>}
      {loading ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <div className="pokemon-container">
          {pokemon.map((poke, index) => (
            <PokemonCard key={index} pokemon={poke} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
