import React, { useState, useContext, useEffect } from "react";
import Scene from "./Scene";
import { GameStateContext, SceneContext } from "../PokeApp";
import "./css/BattleScene.css";

export default function BattleScene() {

	const gameState = useContext(GameStateContext)
    const { player, locations } = gameState
    const scene = useContext(SceneContext);

    const [enemy, setEnemy] = useState({})
    const [playerHp, setPlayerHp] = useState(null)

    useEffect(() => {
        setEnemy(getRandomEncounter(locations.pokemonEncounters))
    }, []);

    useEffect(() => {

    })

    const [playerTurn, setPlayerTurn] = useState(true);

    const handleAttack = () => {
        setPlayerTurn(false)
    }

    const handleRun = () => {
        scene.nextScene('stageSelect')
    };

    const handleEndBattle = () => {
        scene.nextScene('menu')
    };

    function getRandomEncounter(array) {
        const roundedIndex = Math.floor(Math.random() * array.length);
        return array[roundedIndex];
    }

    return (
    <Scene name="battle">
        <div className="battle-ground" style={{backgroundImage: `url(${locations.selectedLocation.imgUrl})`}} >
            <img className="selected-pokemon" src={player.pokemon[0].sprites.back_default} />
            <img className="enemy-pokemon" src={enemy.image} />
        </div>

        {console.log(enemy.stats)}

        <div className='action-container'>
            <div className='battle-text'>What will you do?</div>
            <div className='battle-actions'>
            {/* Add buttons for battle actions, such as attacking, defending, etc. */}
            <button onClick={handleAttack}>Attack</button>
            <button>Defend</button>
            <button onClick={handleRun}>Run</button>
            </div>
            <button className='battle-end' onClick={handleEndBattle}>End Battle</button>
        </div>
    </Scene>
    );
}
