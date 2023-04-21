import React, { useState, useContext, useEffect, useRef } from "react"
import Scene from "./Scene"
import { GameStateContext, SceneContext } from "../PokeApp"
import "./css/BattleScene.css"

export default function BattleScene() {
	const gameState = useContext(GameStateContext)
	const { player, locations } = gameState
	const scene = useContext(SceneContext)

	const [enemy, setEnemy] = useState({})
	const [playerHp, setPlayerHp] = useState(100)
	const [enemyHp, setEnemyHP] = useState(100)
	const [isPlayerTurn, setPlayerTurn] = useState(true)

	const attackButtonRef = useRef()

	useEffect(() => {
		const enemy = getRandomEncounter(locations.pokemonEncounters)

		setEnemy(enemy)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setPlayerHp(prev => prev - dealRandomDamage())
			attackButtonRef.current.disabled = false
		}, 500 + Math.floor(Math.random() * 2000))
	}, [isPlayerTurn])

	useEffect(() => {
		if (playerHp <= 0) {
			scene.nextScene("gameOver")
			// TODO: save winner in state, display on game over screen
		} else if (enemyHp <= 0) {
			scene.nextScene("gameOver")
			// TODO: save winner in state, display on game over screen
		}
	}, [playerHp, enemyHp])

	function handleAttack() {
		setEnemyHP(prev => prev - dealRandomDamage())

		attackButtonRef.current.disabled = true

		setPlayerTurn(!isPlayerTurn)
	}

	function handleRun() {
		scene.nextScene("stageSelect")
	}

	function handleEndBattle() {
		scene.nextScene("menu")
	}

	function getRandomEncounter(array) {
		const roundedIndex = Math.floor(Math.random() * array.length)
		return array[roundedIndex]
	}

	function dealRandomDamage() {
		return Math.floor(Math.random() * 30)
	}

	return (
		<Scene name="battle">
			<div className="battle-ground">
				<img className="background-image" src={locations.selectedLocation.imgUrl} />
				<div className="selected-pokemon">
					<progress value={playerHp} max="100" />
					<img
						src={player.pokemon[0].sprites.versions["generation-v"]["black-white"].animated.back_default}
					/>
				</div>
				<div className="enemy-pokemon">
					<progress value={enemyHp} max="100" />
					<img src={enemy.image} />
				</div>

				<div className="flex-row align-space-between gap-1 action-container">
					<div className="battle-text">What will you do?</div>
					<div className="flex-row align-centered gap-05 battle-actions">
						<button ref={attackButtonRef} onClick={handleAttack}>
							Attack
						</button>
						{/* <button>Defend</button> */}
						<button onClick={handleRun}>Run</button>
						<button onClick={handleEndBattle}>End Battle</button>
					</div>
				</div>
			</div>
		</Scene>
	)
}
