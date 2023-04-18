import React, { useEffect, useState } from "react";
import Scene from "./Scene";

export default function LocationSelectScene({ sceneSwitch }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location?limit=20")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.results);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Scene name="location-select">
        <h1>Loading locations...</h1>
      </Scene>
    );
  }

  return (
    <Scene name="location-select">
      <h1>LocationSelectScene</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.name}>{location.name}</li>
        ))}
      </ul>
      <button onClick={() => sceneSwitch("stageSelect")}>Next</button>
    </Scene>
  );
}
