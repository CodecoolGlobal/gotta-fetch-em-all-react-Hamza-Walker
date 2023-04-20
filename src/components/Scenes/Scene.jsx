export default function Scene({ name, children }) {
	return <section className={`scene ${name}-scene`}>{children}</section>
}
