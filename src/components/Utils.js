

export const  locationImages = {
    "canalave-city": "./src/assets/locations/canalave-city.png",
    "eterna-city": "./src/assets/locations/eterna-city.jpg",
    "pastoria-city": "./src/assets/locations/pastoria-city.jpg",
    "sunyshore-city": "./src/assets/locations/sunyshore-city.jpg",
    "pokemon-league": "./src/assets/locations/sinnoh-pokemon-league.png",
    "oreburgh-mine": "./src/assets/locations/oreburgh-mine.png",
    "valley-windworks": "./src/assets/locations/valley-windworks.png",
    "eterna-forest": "./src/assets/locations/eterna-forest.jpg",
    "fuego-ironworks": "./src/assets/locations/fuego-ironworks.png",
    "mt-coronet": "./src/assets/locations/mt-coronet.png",
    "great-marsh": "./src/assets/locations/great-marsh.png",
    "solaceon-ruins": "./src/assets/locations/solaceon-ruins.png",
    "sinnoh-victory-road": "./src/assets/locations/sinnoh-victory-road.jpg",
    "ravaged-path": "./src/assets/locations/ravaged-path.jpg",
    "oreburgh-gate": "./src/assets/locations/oreburgh-gate.jpg",
    "stark-mountain": "./src/assets/locations/stark-mountain.png",
    "spring-path": "./src/assets/locations/spring-path.jpg",
    "turnback-cave": "./src/assets/locations/turnback-cave.png",
    "snowpoint-temple": "./src/assets/locations/snowpoint-temple.jpg",
    "wayward-cave": "./src/assets/locations/wayward-cave.jpg",
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