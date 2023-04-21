import React, { useContext } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"
import "./css/MenuScene.css"

export default function MenuScene() {
	const scene = useContext(SceneContext)

	return (
		<Scene name="menu">
			<div className="flex-column align-centered gap-1">
				<button onClick={() => scene.nextScene("newPlayer")}>New Game</button>
				<button onClick={() => scene.nextScene("stageSelect")} disabled={true}>
					Load Game
				</button>
			</div>
		</Scene>
	)
}
