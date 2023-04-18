
import React, { useState, useEffect } from "react";
import Scene from "./Scene";

export default function EncounterScene({ sceneSwitch, locationUrl }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(locationUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.pokemon_encounters.length === 0) {
          setPokemon(null);
        } else {
          const randomIndex = Math.floor(Math.random() * data.pokemon_encounters.length);
          const encounter = data.pokemon_encounters[randomIndex];
          fetch(encounter.pokemon.url)
            .then((response) => response.json())
            .then((pokemonData) => {
              setPokemon({
                name: pokemonData.name,
                sprite: pokemonData.sprites.front_default,
              });
            });
        }
        setLoading(false);
      });
  }, [locationUrl]);

  if (loading) {
    return <Scene name="encounter">Loading...</Scene>;
  }

  if (!pokemon) {
    return (
      <Scene name="encounter">
        <p>This location doesn't seem to have any Pokémon.</p>
        <button onClick={() => sceneSwitch("locations")}>Back to locations</button>
      </Scene>
    );
  }

  return (
    <Scene name="encounter">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </Scene>
  );
}
