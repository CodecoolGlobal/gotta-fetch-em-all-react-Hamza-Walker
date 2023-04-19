

export const  locationImages = {
    "canalave-city": "https://via.placeholder.com/150",
    "eterna-city": "https://via.placeholder.com/150",
    "pastoria-city": "https://via.placeholder.com/150",
    "sunyshore-city": "https://via.placeholder.com/150",
    "sinnoh-pokemon-league": "https://via.placeholder.com/150",
    "oreburgh-mine": "https://via.placeholder.com/150",
    "valley-windworks": "https://via.placeholder.com/150",
    "eterna-forest": "https://via.placeholder.com/150",
    "fuego-ironworks": "https://via.placeholder.com/150",
    "mt-coronet": "https://via.placeholder.com/150",
    "great-marsh": "https://via.placeholder.com/150",
    "solaceon-ruins": "https://via.placeholder.com/150",
    "sinnoh-victory-road": "https://via.placeholder.com/150",
    "ravaged-path": "https://via.placeholder.com/150",
    "oreburgh-gate": "https://via.placeholder.com/150",
    "stark-mountain": "https://via.placeholder.com/150",
    "spring-path": "https://via.placeholder.com/150",
    "turnback-cave": "https://via.placeholder.com/150",
    "snowpoint-temple": "https://via.placeholder.com/150",
    "wayward-cave": "https://via.placeholder.com/150",
  };
  
  
  export async function getPokemonLocation(location) {
    const response = await fetch(`https://pokeapi.co/api/v2/location?${location}`);
    const data = await response.json();
    return data;
      
  }
  export async function getPokemonByName(name) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      return data;
    }