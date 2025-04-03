import { Pokemon } from "../services/pokemonAxios";
import React from "react";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
