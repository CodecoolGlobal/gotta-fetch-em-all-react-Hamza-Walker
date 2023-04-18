import React, {useState, useEffect} from 'react'

export const ShowLocations = () => {
    const [locData, setLocData] = useState()
    
    useEffect(() => {
        // fetch the pokemon location from the API
       fetch ('https://pokeapi.co/api/v2/location/?offset=20&limit=18')
       .then(Response => Response.json())
       .then(data => setLocData(data))
      },[]);

  return (
    <div>
        <pre>{JSON.stringify(locData,null,2)}</pre>
        <pre>{}</pre>

    </div>
  )
}
