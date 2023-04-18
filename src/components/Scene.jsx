export default function Scene({ name, children }) {
	return (
		<section className={`scene ${name}-scene`}>
			<h1>{name}</h1>
			{children}
		</section>
	)
}
