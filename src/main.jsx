import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import PokeApp from "./components/PokeApp"

// during development change 'defaultScene' to whatever scene you work on ;)
ReactDOM.createRoot(document.querySelector("main")).render(
	<React.StrictMode>
		<PokeApp defaultScene={"stageSelect"} />
	</React.StrictMode>
)
