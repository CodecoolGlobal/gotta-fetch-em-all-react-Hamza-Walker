import React, { useContext } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"

export default function MenuScene() {
	const scene = useContext(SceneContext)

	return (
		<Scene name="menu">
			<h1>Menu</h1>
			<ul style={{ margin: 0, listStyle: "none" }}>
				<li>
					<button onClick={() => scene.nextScene("newPlayer")}>New Game</button>
				</li>
				<li>
					<button onClick={() => scene.nextScene("stageSelect")}>Load Game</button>
				</li>
				<li>
					<button>Options</button>
				</li>
			</ul>
		</Scene>
	)
}
