import React, {useState, useEffect} from 'react'
import {locationImages , getPokemonLocation} from '../Utils'


export const StageSelectScene = ({ sceneSwitch }) => {
  
  const [locations, setLocations] = useState([]);

  const fetchLocationData = async () => {
    const locationEntries = Object.entries(locationImages);

    const locationData = await Promise.all(locationEntries.map(async ([locationName, imgUrl]) => {
      const pokemonLocationData = await getPokemonLocation(locationName);
      return {
        name: locationName,
        id: pokemonLocationData.id,
          imgUrl,
      };
    })
	);

    setLocations(locationData);
  };


  useEffect(() => {
   fetchLocationData()
  }, []);

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.name} onClick={() => sceneSwitch('encounter', location.url)}>
            <img src={location.imgUrl} alt={location.name} />
            <span>{location.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
