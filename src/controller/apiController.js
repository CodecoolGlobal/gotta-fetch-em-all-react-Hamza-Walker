export async function getPokemon(id) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	return response.json()
}
