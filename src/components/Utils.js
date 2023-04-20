export const locationImages = {
	"canalave-city": "./src/assets/images/locations/canalave-city.png",
	"eterna-city": "./src/assets/images/locations/eterna-city.jpg",
	"pastoria-city": "./src/assets/images/locations/pastoria-city.jpg",
	"sunyshore-city": "./src/assets/images/locations/sunyshore-city.jpg",
	"pokemon-league": "./src/assets/images/locations/sinnoh-pokemon-league.png",
	"oreburgh-mine": "./src/assets/images/locations/oreburgh-mine.png",
	"valley-windworks": "./src/assets/images/locations/valley-windworks.png",
	"eterna-forest": "./src/assets/images/locations/eterna-forest.jpg",
	"fuego-ironworks": "./src/assets/images/locations/fuego-ironworks.png",
	"mt-coronet": "./src/assets/images/locations/mt-coronet.png",
	"great-marsh": "./src/assets/images/locations/great-marsh.png",
	"solaceon-ruins": "./src/assets/images/locations/solaceon-ruins.png",
	"sinnoh-victory-road": "./src/assets/images/locations/sinnoh-victory-road.jpg",
	"ravaged-path": "./src/assets/images/locations/ravaged-path.jpg",
	"oreburgh-gate": "./src/assets/images/locations/oreburgh-gate.jpg",
	"stark-mountain": "./src/assets/images/locations/stark-mountain.png",
	"spring-path": "./src/assets/images/locations/spring-path.jpg",
	"turnback-cave": "./src/assets/images/locations/turnback-cave.png",
	"snowpoint-temple": "./src/assets/images/locations/snowpoint-temple.jpg",
	"wayward-cave": "./src/assets/images/locations/wayward-cave.jpg"
}

export async function getPokemonLocation(location) {
	const response = await fetch(`https://pokeapi.co/api/v2/location/${location}`)
	const data = await response.json()
	return data
}

export async function getPokemonByName(name) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
	const data = await response.json()
	// console.log(data)
	return data
}
export async function getPokemonLocationArea(areaId) {
	const response = await fetch(`https://pokeapi.co/api/v2/location-area/${areaId}`)
	const data = await response.json()

	return data
}

export async function renderPokemonEncounters(pokemonEncounters) {
	const pokemonElements = await Promise.all(
		pokemonEncounters.map(async pokemonName => {
			const pokemonData = await getPokemonByName(pokemonName)
			return pokemonData
		})
	)

	return pokemonElements
}
