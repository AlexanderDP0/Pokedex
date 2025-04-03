import "./App.css";

import { Pokemon } from "./services/pokemonAxios";
import PokemonCard from "./components/pokemonCard";
import PokemonInfoModal from "./components/info";
import SearchBar from "./components/searchBar";
import { usePokemon } from "./hooks/usePokemon";
import { useState } from "react";

function App() {
  const { pokemon, loading, err, search, setSearch } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
            <PokemonCard
              key={index}
              pokemon={poke}
              onClick={setSelectedPokemon}
            />
          ))}
        </div>
      )}
      {selectedPokemon && (
        <PokemonInfoModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default App;
