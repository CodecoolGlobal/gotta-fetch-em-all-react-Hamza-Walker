import React, { useContext } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"

export default function NewPlayerScene(sceneSwitch) {
	const scene = useContext(SceneContext)
	return (
		<Scene name="new-player">
			<h2>New Player</h2>
			<p>Here Players enter their name and select their starting pokemon.</p>
			<p>Then moves on to stage select.</p>
			<button onClick={() => scene.nextScene("stageSelect")}>Next</button>
		</Scene>
	)
}
