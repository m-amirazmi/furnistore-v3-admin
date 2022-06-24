export default function Button({ handleClick, name }) {
	return (
		<button className="mt-2 w-full rounded-lg bg-fuchsia-600 py-2 px-4 text-white hover:bg-fuchsia-500" onClick={handleClick}>
			{name}
		</button>
	);
}
