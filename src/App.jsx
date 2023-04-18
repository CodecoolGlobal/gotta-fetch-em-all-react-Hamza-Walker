
import {ShowLocations} from "./components/ShowLocations"
import {PokemonProvider} from './components/PokemonContextApi'
import PokemonList from './components/PokemonList'
import './app.css' // <-- add this line to import the CSS file


function App() {

  return (
    <PokemonProvider>
    <div className="App">
      
      <h2> Listing Pokémons</h2>

        <PokemonList/>
      <h1>hello</h1>
      <ShowLocations/>
    </div>
    </PokemonProvider>

  )
}

export default App
