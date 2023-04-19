import React, { useContext } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"

export default function NewPlayerScene(sceneSwitch) {
	const scene = useContext(SceneContext)
	return (
		<Scene name="new-player">
			<h2>New Player</h2>
			<input type="text" id="player-name" placeholder="Please enter your name." />
			<div className="starter-pokemon-selection flex-row">
				<div>pokemon 1</div>
				<div>pokemon 2</div>
				<div>pokemon 3</div>
			</div>
			<button onClick={() => scene.nextScene("stageSelect")}>Next</button>
		</Scene>
	)
}
