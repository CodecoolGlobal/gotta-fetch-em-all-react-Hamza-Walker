import React, { useContext, useRef, useEffect, useState } from "react"
import Scene from "./Scene"
import { GameStateContext, SceneContext } from "../PokeApp"
import "./css/NewPlayerScene.css"
import React, { useContext, useEffect, useState } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"
import "./css/NewPlayerScene.css"

// bulbasaur, charmander, squirtle
const starterPokemonIds = [1, 4, 7]

const maleTrainerImg = "/Images/trainer.png"
const femaleTrainerImg = "/Images/femaletrainer.png"

export default function NewPlayerScene() {
	const scene = useContext(SceneContext)
	const gameState = useContext(GameStateContext)
	const pokemonSelection = useRef(null)
	const playerName = useRef("")
	const [starterPokemon, setStarterPokemon] = useState([])
	const [selectedPokemon, setSelectedPokemon] = useState(null)

	useEffect(() => {
		const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
		const getFromApi = async () => {
			const response = await Promise.all(starterPokemonIds.map(pokemonId => fetch(getPokemonUrl(pokemonId))))
			const pokemon = await Promise.all(response.map(res => res.json()))
			setStarterPokemon(pokemon)
		}
		getFromApi()
	}, [])

	function handleSelectPokemon(pokemon) {
		setSelectedPokemon(pokemon)
	}
	function handleSubmit(e) {
		e.preventDefault()

		gameState.setPlayerName(playerName.current.value)
		gameState.setPlayerPokemon([selectedPokemon])

		scene.nextScene("stageSelect")
	}

	if (!starterPokemon.length) return <div>Loading ...</div>

	return (
		<Scene name="new-player">
			<h2>New Game</h2>
			<form className="flex-column gap-05" onSubmit={handleSubmit}>
				<input ref={playerName} type="text" id="player-name" placeholder="Please enter your name." />
				<h3>Pick a starter pokémon</h3>
				<div ref={pokemonSelection} className="flex-row gap-025">
					{starterPokemon.map((pokemon, index) => (
						<div
							key={index}
							className={`flex-column align-spacebetween pokemon-card${
								selectedPokemon && selectedPokemon.name === pokemon.name ? " selected" : ""
							}`}
							onClick={() => handleSelectPokemon(pokemon)}
						>
							<img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} />
							<h3>{`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`}</h3>
							<ul>
								<li className="flex-row align-spacebetween">
									<div>HP</div>
									<div>{pokemon.stats[0].base_stat}</div>
								</li>
								<li className="flex-row align-spacebetween">
									<div>ATK</div>
									<div>{pokemon.stats[1].base_stat}</div>
								</li>
								<li className="flex-row align-spacebetween">
									<div>DEF</div>
									<div>{pokemon.stats[2].base_stat}</div>
								</li>
							</ul>
						</div>
					))}
				</div>
				<div className="flex-row button-row">
					<button onClick={() => scene.nextScene("menu")} type="submit">
						Back
					</button>
					<button disabled={playerName.current.value === "" || selectedPokemon === null}>Next</button>
				</div>
			</form>
		</Scene>
	)
	const scene = useContext(SceneContext)
	const [starterPokemon, setStarterPokemon] = useState([])
	const { locations, setLocations } = useContext(SceneContext)
	const { selectedPokemon, selectedTrainer } = locations

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

	const handlePokemonClick = pokemon => {
		setLocations({ ...locations, selectedPokemon: pokemon })
	}

	const handleTrainerClick = trainer => {
		setLocations({ ...locations, selectedTrainer: trainer })
	}

	const handleNextClick = () => {
		if (selectedPokemon !== null && selectedTrainer !== null) {
			scene.nextScene("stageSelect")
		}
	}

	return (
		<Scene name="new-player">
			<h2>New Player</h2>
			<input type="text" id="player-name" placeholder="Please enter your name." />
			<div className="starter-pokemon-selection flex-row">
				{starterPokemon.map((pokemon, index) => (
					<div
						key={index}
						className="flex-column align-centered pokemon-card"
						onClick={() => handlePokemonClick(pokemon)}
						style={{
							border: selectedPokemon === pokemon ? "2px solid red" : "none"
						}}
					>
						<img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} />
						<div>{pokemon.name}</div>
					</div>
				))}
			</div>
			<div className="trainer-selection flex-row">
				<div
					className="flex-column align-centered trainer-card"
					onClick={() => handleTrainerClick(maleTrainerImg)}
					style={{
						border: selectedTrainer === maleTrainerImg ? "2px solid red" : "none"
					}}
				>
					<img src={maleTrainerImg} />
					<div>Male Trainer</div>
				</div>
				<div
					className="flex-column align-centered trainer-card"
					onClick={() => handleTrainerClick(femaleTrainerImg)}
					style={{
						border: selectedTrainer === femaleTrainerImg ? "2px solid red" : "none"
					}}
				>
					<img src={femaleTrainerImg} />
					<div>Female Trainer</div>
				</div>
			</div>
			<button onClick={handleNextClick}>Next</button>
		</Scene>
	)
}
