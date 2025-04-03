import { Pokemon } from "../services/pokemonAxios";

interface Info {
  pokemon: Pokemon;
  onClose: () => void;
}

const Info: React.FC<Info> = ({ pokemon, onClose }) => {
  return (
    <div className="pokemon-info">
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>
        <strong>Tipo:</strong> {pokemon.types}
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.weight} kg
      </p>
      <p>
        <strong>Habilidades:</strong> {pokemon.abilities.join(", ")}
      </p>
    </div>
  );
};

export default Info;
