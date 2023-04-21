import React, { useContext } from "react"
import { SceneContext } from "../PokeApp"
import Scene from "./Scene"
import "./css/GameOverScene.css"

export default function GameOverScene() {
	const scenes = useContext(SceneContext)

	// TODO: get winner from state
	return (
		<Scene name="game-over">
			<div className="flex-column align-space-between gap-1">
				<h1>Game Over</h1>
				<div>Someone won</div>
				<button onClick={() => scenes.nextScene("menu")}>Back to menu</button>
			</div>
		</Scene>
	)
}
