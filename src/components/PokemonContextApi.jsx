import React, { createContext, useState, useEffect } from 'react';
import { getPokemonByName } from './Utils';

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemonData = async () => {
    const defaultPokemons = ['bulbasaur', 'charmander', 'squirtle'];
    const newPokemons = [];
    
    for (const pokemon of defaultPokemons) {
      const pokemonData = await getPokemonByName(pokemon);
      console.log(pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default)
      const newPokemon = { id: pokemonData.id, name:pokemonData.name ,image:pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default };
      newPokemons.push(newPokemon);
      // console.log(newPokemons)
    }

    setPokemons(newPokemons);
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const providerValue = {
    pokemons
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  )
};
