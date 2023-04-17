import { useState } from "react"
import WelcomeScene from "./Scenes/WelcomeScene"
import NewPlayerScene from "./Scenes/NewPlayerScene"
import StageSelectScene from "./Scenes/StageSelectScene"

export default function PokeApp({ defaultScene }) {
	const [currentScene, setCurrentScene] = useState(defaultScene || "welcome")

	function nextScene(scene) {
		//TODO: scene transition
		//			maybe use animation library
		setCurrentScene(scene)
	}

	const scenes = {
		welcome: WelcomeScene(nextScene),
		newPlayer: NewPlayerScene(nextScene),
		stageSelect: StageSelectScene(nextScene),

		//TODO: remove the entry below once scenes are set in stone!
		//			It's only to remind us of errors bc this wouldn't throw :\
		error: (
			<div className="bold">
				SceneManager.jsx: scenes["<span className="error">{currentScene}</span>"] missing
			</div>
		)
	}

	return scenes[currentScene] ?? scenes.error
}
