import React, { useContext, useEffect, useState } from "react"
import Scene from "./Scene"
import { SceneContext } from "../PokeApp"

export default function WelcomeScene() {
	const scene = useContext(SceneContext)
	const [remaining, setRemaining] = useState(3500)

	useEffect(() => {
		if (remaining >= 0) {
			setTimeout(() => {
				setRemaining(remaining - 1000)
			}, 1000)
		} else {
			scene.nextScene("newPlayer")
		}
	}, [remaining])

	return (
		<Scene name="welcome">
			<h1>Welcome Scene</h1>
			<p>This greets the player. Maybe greet the player personally?! ¯\_(ツ)_/¯</p>
			<p>It is automatically forwarded to the next scene.</p>
			<p>Remaining: {(remaining / 1000).toFixed(0)}s</p>
		</Scene>
	)
}
