// src/components/scenes/LocationScene.jsx
import React, { useState, useEffect } from "react";
import Scene from "./Scene";

export default function LocationScene({ sceneSwitch }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location?limit=20")
      .then((response) => response.json())
      .then((data) => setLocations(data.results));
  }, []);

  return (
    <Scene name="locations">
      <h1>Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.name} onClick={() => sceneSwitch("encounter", location.url)}>
            {location.name}
          </li>
        ))}
      </ul>
    </Scene>
  );
}
