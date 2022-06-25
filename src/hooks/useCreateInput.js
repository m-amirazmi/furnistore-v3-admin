import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { upload } from '../utils/api';

export default function useCreateInput({ inputForm, redirect, save }) {
	const [input, setInput] = useState([inputForm]);
	const [showInputs, setShowInputs] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleInput = ({ currentTarget }, key) => {
		const copyInputs = [...input];
		if (currentTarget.type === 'checkbox') {
			copyInputs[key][currentTarget.id] = !copyInputs[key][currentTarget.id];
		} else if (currentTarget.type === 'file') copyInputs[key][currentTarget.id] = currentTarget.files;
		else copyInputs[key][currentTarget.id] = currentTarget.value;
		setInput(copyInputs);
	};

	const handleAddInput = () => {
		const copyInputs = [...input];
		copyInputs.push(inputForm);
		setInput(copyInputs);
	};

	const handleShow = (id) => {
		const copyShowInputs = [...showInputs];
		copyShowInputs[id] = !copyShowInputs[id];
		setShowInputs(copyShowInputs);
	};

	const handleSubmit = async () => {
		setLoading(true);
		for (const [i, eachInput] of input.entries()) {
			const images = [];
			for (const image of eachInput.images) {
				const res = await upload({ input: image });
				images.push(res);
			}
			eachInput.images = images;
			await save({ body: eachInput, method: 'post' });
		}
		navigate(redirect);
		setInput([inputForm]);
		setLoading(false);
	};

	return { input, loading, showInputs, handleInput, handleAddInput, handleShow, handleSubmit };
}
