import React, { useState, useEffect, useContext } from "react"
import { locationImages, getPokemonLocation, getPokemonLocationArea, getPokemonByName } from "../Utils"
import { SceneContext } from "../PokeApp"

export const StageSelectScene = ({ sceneSwitch }) => {
	//   const [locations, setLocations] = useState({
	//     data: [],
	//     selectedLocation: null,
	//     pokemonEncounters: [],
	// 	   ChallangePokemon: null,
	// 	   playerPokemon:null,

	//   });
	const { locations, setLocations } = useContext(SceneContext)
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
		setLocations({ ...locations, data: locationData })
	}

	const renderEncouterdPokemon = async () => {
		if (!locations.selectedLocation) return
		const pokemonDataPromises = locations.selectedLocation.pokemonEncounters.map(async pokemonName => {
			const pokemonData = await getPokemonByName(pokemonName)
			return {
				name: pokemonName,
				image: pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default
			}
		})

		const pokemonData = await Promise.all(pokemonDataPromises)

		setLocations({ ...locations, pokemonEncounters: pokemonData })
	}

	useEffect(() => {
		fetchLocationData()
	}, [])

	useEffect(() => {
		renderEncouterdPokemon()
	}, [locations.selectedLocation])

	return (
		<div>
			<h1>Locations</h1>
			<div className="flex-row gap-1">
				<div className="grid-container">
					{locations.data.map(location => (
						<div
							key={location.name}
							onClick={() => {
								setLocations({ ...locations, selectedLocation: location })
							}}
							className={`location-card ${locations.selectedLocation === location ? "selected" : ""}`}
						>
							<img src={location.imgUrl} alt={location.name} />
							<div>{location.name}</div>
						</div>
					))}
				</div>
				<div className="selected-img-and-pokemons-div">
					{locations.selectedLocation && (
						<img
							src={locations.selectedLocation.imgUrl}
							alt={locations.selectedLocation.name}
							className="selected-img"
						/>
					)}
					<div className="encountered-pokemon">
						{locations.pokemonEncounters.map((pokemon, index) => (
							<img
								key={`${pokemon.name}-${index}`}
								src={pokemon.image}
								alt={pokemon.name}
								onClick={() =>
									setLocations({ ...locations, ChallangePokemon: pokemon }, console.log(pokemon))
								}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
