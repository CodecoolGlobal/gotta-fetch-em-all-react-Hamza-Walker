import { useContext, useRef, useEffect, useState } from "react"
import clsx from "clsx";
import Scene from "./Scene"
import { GameStateContext, SceneContext } from "../PokeApp"
import "./css/NewPlayerScene.css"
import { capitalize } from "../../utils";

// bulbasaur, charmander, squirtle
const starterPokemonIds = [1, 4, 7]

const maleAvatar = "./src/assets/images/player/trainer.png"
const femaleAvatar = "./src/assets/images/player/trainer_female.png"

export default function NewPlayerScene() {
	const scene = useContext(SceneContext)
	const gameState = useContext(GameStateContext)
	const pokemonSelection = useRef(null)
	const playerName = useRef("")
	const [starterPokemon, setStarterPokemon] = useState([])
	const [selectedPokemon, setSelectedPokemon] = useState(null)
	const [avatar, setAvatar] = useState(null)

	useEffect(() => {
		const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
		const getFromApi = async () => {
			const pokemon = await Promise.all(
				starterPokemonIds.map(
					pokemonId => fetch(getPokemonUrl(pokemonId)).then(res => res.json())
				)
			)
			setStarterPokemon(pokemon)
		}
		getFromApi()
	}, [])

	function handleSelectPokemon(pokemon) {
		setSelectedPokemon(pokemon)
	}
	function handleSelectPlayerAvatar(avatar) {
		setAvatar(avatar)
	}
	function handleSubmit(e) {
		e.preventDefault()

		gameState.setPlayerName(playerName.current.value)
		gameState.setPlayerPokemon([selectedPokemon])
		gameState.setPlayerAvatar(avatar)

		scene.nextScene("stageSelect")
	}

	if (!starterPokemon.length) return <div>Loading ...</div>

	return (
		<Scene name="new-player">
			<h2>New Game</h2>
			<form className="flex-column gap-05" onSubmit={handleSubmit}>
				<input ref={playerName} type="text" id="player-name" placeholder="Please enter your name." />
				<h3>Pick a starter pokémon</h3>
				<div ref={pokemonSelection} className="flex-row gap-05">
					{starterPokemon.map((pokemon, index) => (
						<div
							key={index}
							className={clsx(
								"flex-column",
								"align-space-between",
								"pokemon-card",
								{
									selected: selectedPokemon && selectedPokemon.name === pokemon.name
								}
							)}
							onClick={() => handleSelectPokemon(pokemon)}
						>
							<img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} />
							<h3>{capitalize(pokemon.name)}</h3>
							<ul className="flex-column gap-05">
								<li className="flex-row align-space-between">
									<div>HP</div>
									<div>{pokemon.stats[0].base_stat}</div>
								</li>
								<li className="flex-row align-space-between">
									<div>ATK</div>
									<div>{pokemon.stats[1].base_stat}</div>
								</li>
								<li className="flex-row align-space-between">
									<div>DEF</div>
									<div>{pokemon.stats[2].base_stat}</div>
								</li>
							</ul>
						</div>
					))}
				</div>
				<div className="trainer-selection align-space-between flex-row gap-05">
					<div
						className={`flex-column align-space-between trainer-card${
							avatar && avatar === maleAvatar ? " selected" : ""
						}`}
						onClick={() => handleSelectPlayerAvatar(maleAvatar)}
					>
						<img src={maleAvatar} />
						<div>Male</div>
					</div>
					<div
						className={`flex-column align-space-between trainer-card${
							avatar && avatar === femaleAvatar ? " selected" : ""
						}`}
						onClick={() => handleSelectPlayerAvatar(femaleAvatar)}
					>
						<img src={femaleAvatar} />
						<div>Female</div>
					</div>
				</div>
				<div className="flex-row button-row">
					<button onClick={() => scene.nextScene("menu")}>
						Back
					</button>
					<button type="submit" disabled={playerName.current.value === "" || selectedPokemon === null || avatar === null}>
						Next
					</button>
				</div>
			</form>
		</Scene>
	)
}
