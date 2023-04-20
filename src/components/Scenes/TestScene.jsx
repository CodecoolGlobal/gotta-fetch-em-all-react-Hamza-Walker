import { useContext } from "react"
import { GameStateContext } from "../PokeApp"

export default function TestScene() {
	const gameState = useContext(GameStateContext)
	const { player, locations } = gameState

	return (
		<>
			<div>Player (just name, theres more in it)</div>
			<div>{player.name}</div>
			<div>POKEMON (like for example the pokemon array which holds the players pokemon)</div>
			<pre>
				{JSON.stringify(
					player.pokemon.map(p => ({
						name: p.name,
						stats: p.stats
					})),
					null,
					2
				)}
			</pre>
			<div>SELECTED LOCATION (the location we selected)</div>
			<pre>{JSON.stringify(locations.selectedLocation, null, 2)}</pre>
			<div>POKEMON ENCOUNTERS (the images and names of thepokemon we encoutered)</div>
			<pre>{JSON.stringify(locations.pokemonEncounters, null, 2)}</pre>
		</>
	)
}
