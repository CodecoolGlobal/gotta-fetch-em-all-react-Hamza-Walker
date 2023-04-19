import { useState } from "react"
import { useEffect } from "react"
// import "../PokeApp.css"

export default function Scene({ name, children }) {
	return <section className={`scene ${name}-scene`}>{children}</section>
}
