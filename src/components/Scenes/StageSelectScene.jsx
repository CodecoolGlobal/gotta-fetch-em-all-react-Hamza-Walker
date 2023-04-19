import React, { useContext } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"

export default function StageSelectScene() {
	const scene = useContext(SceneContext)
	return (
		<Scene name="stage-select">
			<h1>StageSelectScene</h1>
			<p>
				Here Player select a stage. there is a selection-grid on the left and a stage preview at the right side.
			</p>
			<p>The button below leads to a page which does not exist. It shows an error message</p>
			<button onClick={() => scene.nextScene("aTypoOrSomething")}>I will fail</button>
		</Scene>
	)
}
