import React, { useState, useEffect } from "react"
import { locationImages, getPokemonLocation } from "../Utils"

export const StageSelectScene = ({ sceneSwitch }) => {
	const [locations, setLocations] = useState({
		data: [],
		selectedLocation: null
	})

	const fetchLocationData = async () => {
		const locationEntries = Object.entries(locationImages)

		const locationData = await Promise.all(
			locationEntries.map(async ([locationName, imgUrl]) => {
				const pokemonLocationData = await getPokemonLocation(locationName)
				return {
					name: locationName,
					id: pokemonLocationData.id,
					imgUrl
				}
			})
		)

		setLocations({ ...locations, data: locationData })
	}

	useEffect(() => {
		fetchLocationData()
	}, [])

	return (
		<div>
			<h1>Locations</h1>
			<div className="flex-row">
				<div className="grid-container">
					{locations.data.map(location => (
						<div
							key={location.name}
							onClick={() => {
								setLocations({ ...locations, selectedLocation: location })
								console.log("Selected location:", location)
							}}
							className={`location-card ${locations.selectedLocation === location ? "selected" : ""}`}
						>
							<img src={location.imgUrl} alt={location.name} />
							<div>{location.name}</div>
						</div>
					))}
				</div>
				<div>Not in the grid anymore</div>
			</div>
		</div>
	)
}
