// src/components/Scenes/NewPlayerScene.jsx
import React from "react";
import Scene from "./Scene";

export default function NewPlayerScene({ sceneSwitch }) {
  return (
    <Scene name="new-player">
      <h1>NewPlayerScene</h1>
      <p>Here Players enter their name and select their starting pokemon.</p>
      <p>Then moves on to stage select.</p>
      <button onClick={() => sceneSwitch("stageSelect")}>Next</button>
    </Scene>
  );
}
