import { createContext, useState } from "react"
import WelcomeScene from "./Scenes/WelcomeScene"
import NewPlayerScene from "./Scenes/NewPlayerScene"
import StageSelectScene from "./Scenes/StageSelectScene"



export const SceneContext = createContext()
export const GameStateContext = createContext()

export default function PokeApp({ defaultScene }) {
	const [currentScene, setCurrentScene] = useState(defaultScene || "welcome")
	const [locations, setLocations] = useState({
		data: [],
		selectedLocation: null,
		pokemonEncounters: [],
		   ChallangePokemon: null,
		   playerPokemon:null,
		   selectedPokemon: null,
		   selectedTrainer: null,
	
	  });
	function nextScene(scene) {
		//TODO: scene transition
		//			maybe use animation library
		setCurrentScene(scene)
	}

	const scenes = {
		welcome: <WelcomeScene />,
		newPlayer: <NewPlayerScene />,
		stageSelect: <StageSelectScene />,

		//TODO: remove the entry below once scenes are set in stone!
		//			It's only to remind us of errors bc this wouldn't throw :\
		error: (
			<div className="bold">
				SceneManager.jsx: scenes["<span className="error">{currentScene}</span>"] missing
			</div>
		)
	}
	const provider = {
		nextScene,
		locations,
		setLocations
	}

	return (
		<SceneContext.Provider value={ provider }>
			<GameStateContext.Provider value={null}>{scenes[currentScene] ?? scenes.error}</GameStateContext.Provider>
		</SceneContext.Provider>
	)
}
