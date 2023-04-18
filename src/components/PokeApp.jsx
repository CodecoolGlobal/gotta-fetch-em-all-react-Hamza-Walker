import { useState } from "react"
import { gameStateContext as GameStateContext } from "../contexts/GameStateContext"
import WelcomeScene from "./scenes/WelcomeScene"
import MenuScene from "./scenes/MenuScene"
import StageSelectScene from "./scenes/StageSelectScene"

export default function PokeApp({ defaultScene }) {
	const [gameState, setGameState] = useState({})
	const [currentScene, setCurrentScene] = useState(defaultScene || "welcome")

	function nextScene(scene) {
		//TODO: scene transition
		//			maybe use animation library
		setCurrentScene(scene)
	}

	return <GameStateContext.Provider value={gameState}>{MenuScene(nextScene)}</GameStateContext.Provider>
}
