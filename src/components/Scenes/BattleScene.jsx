import React, { useState, useContext, useEffect, useRef } from "react"
import Scene from "./Scene"
import { GameStateContext, SceneContext } from "../PokeApp"
import "./css/BattleScene.css"
import { pickItemFromArray } from "../../utils"

export default function BattleScene() {
	const gameState = useContext(GameStateContext)
	const { player, gameVariables } = gameState
	const scene = useContext(SceneContext)

	const [enemy, setEnemy] = useState(null)
	const [playerHp, setPlayerHp] = useState(100)
	const [enemyHp, setEnemyHP] = useState(100)
	const [isPlayerTurn, setPlayerTurn] = useState(true)

	const attackButtonRef = useRef()

	useEffect(() => {
		const enemy = pickItemFromArray(gameVariables.pokemonEncounters)

		setEnemy(enemy)
	}, [])

	useEffect(() => {
		if (isPlayerTurn) { 
			return
		}

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

		setPlayerTurn(prev => !prev)
	}

	function handleRun() {
		scene.nextScene("stageSelect")
	}

	function handleEndBattle() {
		scene.nextScene("menu")
	}

	function dealRandomDamage() {
		return Math.floor(Math.random() * 30)
	}

	if (!enemy) {
		return <p>Loading enemy...</p>
	}

	return (
		<Scene name="battle">
			<div className="battle-ground">
				<img className="background-image" src={gameVariables.selectedLocation.imgUrl} />
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
