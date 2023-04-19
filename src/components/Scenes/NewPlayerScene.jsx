import React, { useContext, useEffect, useState } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"
import "./css/NewPlayerScene.css"

// bulbasaur, charmander, squirtle
const starterPokemonIds = [1, 4, 7]

export default function NewPlayerScene() {
	const scene = useContext(SceneContext)
	const [starterPokemon, setStarterPokemon] = useState([])

	useEffect(() => {
		const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
		const getFromApi = async () => {
			const response = await Promise.all(starterPokemonIds.map(pokemonId => fetch(getPokemonUrl(pokemonId))))
			const pokemon = await Promise.all(response.map(res => res.json()))
			setStarterPokemon(pokemon)
		}
		getFromApi()
	}, [])

	if (!starterPokemon?.length) return <div>Loading ...</div>

	return (
		<Scene name="new-player">
			<h2>New Player</h2>
			<input type="text" id="player-name" placeholder="Please enter your name." />
			<div className="starter-pokemon-selection flex-row">
				<div className="flex-column align-centered pokemon-card">
					<img
						src={starterPokemon[0].sprites.versions["generation-v"]["black-white"].animated.front_default}
					/>
					<div>{starterPokemon[0].name}</div>
				</div>
				<div className="flex-column align-centered pokemon-card">
					<img
						src={starterPokemon[1].sprites.versions["generation-v"]["black-white"].animated.front_default}
					/>
					<div>{starterPokemon[1].name}</div>
				</div>
				<div className="flex-column align-centered pokemon-card">
					<img
						src={starterPokemon[2].sprites.versions["generation-v"]["black-white"].animated.front_default}
					/>
					<div>{starterPokemon[2].name}</div>
				</div>
			</div>
			<button onClick={() => scene.nextScene("stageSelect")}>Next</button>
		</Scene>
	)
}
