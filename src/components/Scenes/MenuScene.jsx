import React from "react"
import Scene from "../Scene"

export default function MenuScene(sceneSwitch) {
	return (
		<Scene name="menu">
			<h1>Menu</h1>
			<ul style={{ margin: 0, listStyle: "none" }}>
				<li>
					<button>New Game</button>
				</li>
				<li>
					<button onClick={() => sceneSwitch("stageSelect")}>Load Game</button>
				</li>
				<li>
					<button>Options</button>
				</li>
			</ul>
		</Scene>
	)
}
