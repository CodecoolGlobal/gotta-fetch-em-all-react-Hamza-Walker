import React, { useState, useEffect, useContext } from "react"
import Scene from "./Scene"
import { locationImages, getPokemonLocation, getPokemonLocationArea, getPokemonByName } from "../Utils"
import { GameStateContext, SceneContext } from "../PokeApp"
import './css/StageSelectScene.css'

export default function StageSelectScene({ sceneSwitch }) {
	const scene = useContext(SceneContext)
	const gameState = useContext(GameStateContext)

	const { gameVariables, setGameVariables } = gameState
	const { selectedPokemon, selectedTrainer } = gameState

	const fetchLocationData = async () => {
		const locationEntries = Object.entries(locationImages)

		const locationData = await Promise.all(
			locationEntries.map(async ([locationName, imgUrl]) => {
				const pokemonLocationData = await getPokemonLocation(locationName)
				const pokemonLocationAreaData = await getPokemonLocationArea(pokemonLocationData.id)
				const pokemonNames = pokemonLocationAreaData["pokemon_encounters"].map(area => {
					return area.pokemon.name
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

	const renderEncouterdPokemon = async () => {
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

		setGameVariables({ ...gameVariables, pokemonEncounters: pokemonData })
	}

	useEffect(() => {
		fetchLocationData()
	}, [])

	useEffect(() => {
		renderEncouterdPokemon()
	}, [gameVariables.selectedLocation])

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
						<button onClick={() => scene.nextScene("battleScene") }class="fight-btn">Fight</button>					
					</div>
				</div>
			</div>
			<button onClick={() => scene.nextScene('battle')}>Battle here!</button>
			<button onClick={() => scene.nextScene("testScene")}>clickedclick</button>
		</Scene>
	)
}
