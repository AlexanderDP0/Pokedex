import { Pokemon, getPokemonList } from "../services/pokemonAxios";
import { useEffect, useState } from "react";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr(null);

      const data = await getPokemonList();
      if (data.length === 0) setErr("No se pudieron obtener los Pokémon");
      setPokemon(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return { pokemon: filteredPokemon, loading, err, search, setSearch };
};
