import React, { createContext, useState, useEffect } from 'react';
import { getPokemonByName } from './Utils';

export const PokemonContext = createContext();

export const PokemonContextApi = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemonData = async () => {
    const defaultPokemons = ['bulbasaur', 'charmander', 'squirtle'];
    const newPokemons = [];

    for (const pokemon of defaultPokemons) {
      const pokemonData = await getPokemonByName(pokemon);
      const newPokemon = { id: pokemonData.id, name: pokemonData.name };
      newPokemons.push(newPokemon);
    }

    setPokemons(newPokemons);
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const providerValue = {
    pokemons,
  };

  return <PokemonContext.Provider value={providerValue} />;
};
