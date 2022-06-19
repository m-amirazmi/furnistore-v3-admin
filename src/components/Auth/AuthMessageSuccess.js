export default function AuthMessageSuccess({ message }) {
	if (!message) return null;
	return <p className="mb-4 rounded-lg bg-green-500 bg-opacity-20 py-2 px-4 text-sm text-green-500">{message}</p>;
}
