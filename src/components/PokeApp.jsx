import React, { useState } from "react";
import WelcomeScene from "./Scenes/WelcomeScene";
import NewPlayerScene from "./Scenes/NewPlayerScene";
import StageSelectScene from "./Scenes/StageSelectScene";
import LocationSelectScene from "./Scenes/LocationSelectScene"; // Add this import

export default function PokeApp({ defaultScene }) {
  const [currentScene, setCurrentScene] = useState(defaultScene || "welcome");

  function sceneSwitch(scene) {
    setCurrentScene(scene);
  }

  const scenes = {
    welcome: <WelcomeScene sceneSwitch={sceneSwitch} />,
    newPlayer: <NewPlayerScene sceneSwitch={sceneSwitch} />,
    stageSelect: <StageSelectScene sceneSwitch={sceneSwitch} />,
    locationSelect: <LocationSelectScene sceneSwitch={sceneSwitch} />, // Add this line
    error: (
      <div className="bold">
        SceneManager.jsx: scenes["<span className="error">{currentScene}</span>"] missing
      </div>
    ),
  };

  return scenes[currentScene] ?? scenes.error;
}
