import "./App.css";

import PokemonCard from "./components/pokemonCard";
import SearchBar from "./components/searchBar";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const { pokemon, loading, err, search, setSearch } = usePokemon();

  return (
    <div className="app-container">
      <h2>Lista de Pokémon</h2>
      <SearchBar search={search} setSearch={setSearch} />

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
