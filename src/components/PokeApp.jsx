import { createContext, useState } from "react"
import NewPlayerScene from "./Scenes/NewPlayerScene"
import MenuScene from "./Scenes/MenuScene"
import StageSelectScene from "./Scenes/StageSelectScene"
import TestScene from "./Scenes/testScene"

export const SceneContext = createContext()
export const GameStateContext = createContext()

export default function PokeApp({ defaultScene }) {
	const [player, setPlayer] = useState({})
	const [currentScene, setCurrentScene] = useState(defaultScene || "menu")
	const [gameVariables, setGameVariables] = useState({
		locationsData: [],
		playerPokemon: null,
		selectedPokemon: null,
		selectedTrainer: null,
		selectedLocation: null,
		pokemonEncounters: [],
		challengePokemon: null
	})
	function nextScene(scene) {
		//TODO: scene transition
		//			maybe use animation library
		setCurrentScene(scene)
	}
	function setPlayerName(name) {
		setPlayer(prev => ({ ...prev, name }))
	}
	function setPlayerPokemon(pokemon) {
		setPlayer(prev => ({ ...prev, pokemon }))
	}
	function setPlayerAvatar(avatar) {
		setPlayer(prev => ({ ...prev, avatar }))
	}

	const scenes = {
		menu: <MenuScene />,
		newPlayer: <NewPlayerScene />,
		stageSelect: <StageSelectScene />,
		testScene: <TestScene />,

		//TODO: remove the entry below once scenes are set in stone!
		//			It's only to remind us of errors bc this wouldn't throw :\
		error: (
			<div className="bold">
				SceneManager.jsx: scenes["<span className="error">{currentScene}</span>"] missing
			</div>
		)
	}
	// const provider = {
	// 	nextScene,
	// 	locations,
	// 	setLocations
	// }

	return (
		<SceneContext.Provider value={{ nextScene }}>
			<GameStateContext.Provider
				value={{ player, gameVariables, setPlayerName, setPlayerPokemon, setPlayerAvatar, setGameVariables }}
			>
				{scenes[currentScene] ?? scenes.error}
			</GameStateContext.Provider>
		</SceneContext.Provider>
	)
}
