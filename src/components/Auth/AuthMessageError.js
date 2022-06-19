export default function AuthMessageError({ message }) {
	if (!message) return null;
	return <p className="mb-2 rounded-lg bg-red-500 bg-opacity-20 py-2 px-4 text-sm text-red-500">{message}</p>;
}
