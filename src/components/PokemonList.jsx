import React, { useContext } from 'react'
import { PokemonContext } from './PokemonContextApi'

export const PokemonList = () => {
    const { pokemons } = useContext(PokemonContext)
  
    const select = (pokemon) => {
      // Handle the selection of a pokemon
      console.log(pokemon)
    }
  
    // Check if the pokemons array is empty
    if (pokemons.length === 0) {
      return <div>No pokemons found.</div>
    }
  
    return (
      <div className="pokemons-list">
        <h3>Pokemons List</h3>
        
        {/* {pokemons.map((pokemon) =>
          <div key={`${pokemon.id}-${pokemon.name}`}>
            <img src={pokemon.image} alt={pokemon.name} />
            <span>{pokemon.name}</span>
            <button onClick={() => select(pokemon)}>+</button>
          </div>
        )} */}
      </div>
    )
  }
  

// export default PokemonList
