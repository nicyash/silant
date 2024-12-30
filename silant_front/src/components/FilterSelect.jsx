import React, { useState, useEffect } from "react";
import axios from "axios";

function FilterSelect({
	apiUrl,
	placeholder="Выберите значение",
	onChange,
	additionalHandler,
}) {
	const [options, setOptions] = useState([]);
	const [selectedValue, setSelectedValue] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(apiUrl);
				setOptions(response.data.results.map(item => ({
					id: item.id,
					name: item.machine_SN || item.name
				})));
				setLoading(false);

				if (additionalHandler) {
					additionalHandler(response.data.results)
				}
			} catch (error) {
				setLoading(false);
			}
		};
		
		fetchData();
	}, [apiUrl]);

	const handleChange = (event) => {
		const value = event.target.value;
		setSelectedValue(value);
		
		const selectedOption = options.find(option => option.name === value);
		if (selectedOption) {
			onChange(selectedOption.id);
		} else {
			onChange('');
		}
	};

	const handleReset = () => {
		setSelectedValue('');
		onChange('');
	};

	const optionElements = options.map(option => (
		<option key={option.id} value={option.name}>
			{option.name}
		</option>
	));
	
	return (
		<div>
			<select value={selectedValue} onChange={handleChange}>
				<option value="" disabled>{placeholder}</option>
				{optionElements}
			</select>
			<button type="button" onClick={handleReset}>Сброс</button>
		</div>
	);
}

export default FilterSelect;
