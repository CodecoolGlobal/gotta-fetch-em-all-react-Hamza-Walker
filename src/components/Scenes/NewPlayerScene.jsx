import React, { useContext, useEffect, useState } from "react";
import Scene from "./Scene";
import { SceneContext } from "../PokeApp";
import "./css/NewPlayerScene.css";

// bulbasaur, charmander, squirtle
const starterPokemonIds = [1, 4, 7];

const maleTrainerImg = "/Images/trainer.png";
const femaleTrainerImg = "/Images/femaletrainer.png";

export default function NewPlayerScene() {
  const scene = useContext(SceneContext);
  const [starterPokemon, setStarterPokemon] = useState([]);
  const { locations, setLocations } = useContext(SceneContext);
  const { selectedPokemon, selectedTrainer } = locations;

  useEffect(() => {
    const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const getFromApi = async () => {
      const response = await Promise.all(
        starterPokemonIds.map((pokemonId) => fetch(getPokemonUrl(pokemonId)))
      );
      const pokemon = await Promise.all(response.map((res) => res.json()));
      setStarterPokemon(pokemon);
    };
    getFromApi();
  }, []);

  if (!starterPokemon?.length) return <div>Loading ...</div>;

  const handlePokemonClick = (pokemon) => {
    setLocations({ ...locations, selectedPokemon: pokemon });
  };

  const handleTrainerClick = (trainer) => {
    setLocations({ ...locations, selectedTrainer: trainer });
  };

  const handleNextClick = () => {
    if (selectedPokemon !== null && selectedTrainer !== null) {
      scene.nextScene("stageSelect");
    }
  };

  return (
    <Scene name="new-player">
      <h2>New Player</h2>
      <input
        type="text"
        id="player-name"
        placeholder="Please enter your name."
      />
      <div className="starter-pokemon-selection flex-row">
        {starterPokemon.map((pokemon, index) => (
          <div
            key={index}
            className="flex-column align-centered pokemon-card"
            onClick={() => handlePokemonClick(pokemon)}
            style={{
              border:
                selectedPokemon === pokemon ? "2px solid red" : "none",
            }}
          >
            <img
              src={
                pokemon.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              }
            />
            <div>{pokemon.name}</div>
          </div>
        ))}
      </div>
      <div className="trainer-selection flex-row">
        <div
          className="flex-column align-centered trainer-card"
          onClick={() => handleTrainerClick(maleTrainerImg)}
          style={{
            border:
              selectedTrainer === maleTrainerImg ? "2px solid red" : "none",
          }}
        >
          <img src={maleTrainerImg} />
          <div>Male Trainer</div>
        </div>
        <div
          className="flex-column align-centered trainer-card"
          onClick={() => handleTrainerClick(femaleTrainerImg)}
          style={{
            border:
              selectedTrainer === femaleTrainerImg ? "2px solid red" : "none",
          }}
        >
          <img src={femaleTrainerImg} />
          <div>Female Trainer</div>
        </div>
      </div>
      <button onClick={handleNextClick}>Next</button>
    </Scene>
  );
}
