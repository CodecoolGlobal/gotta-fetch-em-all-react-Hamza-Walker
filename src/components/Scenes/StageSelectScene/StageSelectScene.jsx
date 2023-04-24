import React, { useState, useEffect, useContext } from "react"
import Scene from "../Scene"
import { locationImages, getPokemonLocation, getPokemonLocationArea, getPokemonByName } from "./Utils"
import { GameStateContext, SceneContext } from "../../PokeApp"
import '../css/StageSelectScene.css'

export default function StageSelectScene() {
	const scene = useContext(SceneContext)
	const {
		gameVariables,
		setGameVariables,
	} = useContext(GameStateContext)

	const fetchLocationData = async () => {
		const locationEntries = Object.entries(locationImages)

		const locationData = await Promise.all(
			locationEntries.map(async ([locationName, imgUrl]) => {
				const pokemonLocationData = await getPokemonLocation(locationName)
				const pokemonLocationAreaData = await getPokemonLocationArea(pokemonLocationData.id)
				const pokemonNames = pokemonLocationAreaData["pokemon_encounters"].map(encounter => {
					return encounter.pokemon.name
				})

				return {
					name: locationName,
					id: pokemonLocationData.id,
					imgUrl,
					pokemonEncounters: pokemonNames
				}
			})
		)
		setGameVariables({ ...gameVariables, locationsData: locationData })
	}

	const fetchEncouteredPokemon = async () => {
		if (!gameVariables.selectedLocation) return

		const pokemonDataPromises = gameVariables.selectedLocation.pokemonEncounters.map(async pokemonName => {
			const pokemonData = await getPokemonByName(pokemonName)
			return {
				name: pokemonName,
				image: pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default,
				stats: pokemonData.stats
			}
		})

		const pokemonData = await Promise.all(pokemonDataPromises)

		setGameVariables(state => ({ ...state, pokemonEncounters: pokemonData }))
	}

	useEffect(() => {
		fetchLocationData()
	}, [])

	useEffect(() => {
		fetchEncouteredPokemon()
	}, [gameVariables.selectedLocation])

	if (!gameVariables.locationsData) {
		return <p>Loading...</p>
	}

	return (
		<Scene name="stage-select">
			<h1>Locations</h1>
			<div className="flex-row gap-1">
				<div className="grid-container">
					{gameVariables.locationsData.map(location => (
						<div
							key={location.name}
							onClick={() => {
								setGameVariables({ ...gameVariables, selectedLocation: location })
							}}
							className={`location-card ${gameVariables.selectedLocation === location ? "selected" : ""}`}
						>
							<img src={location.imgUrl} alt={location.name} />
							<div>{location.name}</div>
						</div>
					))}
				</div>
				<div className="selected-img-and-pokemons-div">
				<button onClick={() => scene.nextScene("battle")} className="fight-btn">Fight</button>					

					{gameVariables.selectedLocation && (
						<img
							src={gameVariables.selectedLocation.imgUrl}
							alt={gameVariables.selectedLocation.name}
							className="selected-img"
						/>
					)}
					<div className="encountered-pokemon">
						{gameVariables.pokemonEncounters.map((pokemon, index) => (
							<img
								key={`${pokemon.name}-${index}`}
								src={pokemon.image}
								alt={pokemon.name}
								onClick={() =>
									setGameVariables({ ...gameVariables, challengePokemon: pokemon }, console.log(pokemon))
								}
							/>

						))}
					</div>
				</div>
			</div>
		</Scene>
	)
}
