
import {ShowLocations} from "./components/ShowLocations"
import {PokemonProvider} from './components/PokemonContextApi'
import PokemonList from './components/PokemonList'
import './app.css' // <-- add this line to import the CSS file


function App() {

  return (
    <div className="App">
      <PokemonProvider>
      <h2> Listing Pokémons</h2>

        <PokemonList/>
      <h1>hello</h1>
      <ShowLocations/>
      </PokemonProvider>
    </div>
  )
}

export default App
