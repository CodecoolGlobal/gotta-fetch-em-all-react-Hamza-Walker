import { createContext, useState } from "react"
import NewPlayerScene from "./Scenes/NewPlayerScene"
import MenuScene from "./Scenes/MenuScene"
import StageSelectScene from "./Scenes/StageSelectScene"
import BattleScene from "./Scenes/BattleScene"
import GameOverScene from "./Scenes/GameOverScene"

export const SceneContext = createContext()
export const GameStateContext = createContext()

export default function PokeApp({ defaultScene }) {
	const [player, setPlayer] = useState({})
	const [currentScene, setCurrentScene] = useState(defaultScene || "menu")
	const [gameVariables, setGameVariables] = useState({
		locationsData: null,
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
	function setWinner(winner) {
		setPlayer(prev => ({ ...prev, winner }))
	}

	const scenes = {
		menu: <MenuScene />,
		newPlayer: <NewPlayerScene />,
		stageSelect: <StageSelectScene />,
		battle: <BattleScene />,
		gameOver: <GameOverScene />
	}

	return (
		<SceneContext.Provider value={{ nextScene }}>
			<GameStateContext.Provider
				value={{ player, gameVariables, setPlayerName, setPlayerPokemon, setPlayerAvatar, setGameVariables }}
			>
				{scenes[currentScene]}
			</GameStateContext.Provider>
		</SceneContext.Provider>
	)
}
