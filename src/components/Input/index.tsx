import React, {useState} from 'react';
import {Wrapper, Input as I, Label} from './styles';
import StringBuilder from '../../utils/StringBuilder';

interface Props {
	text: string;
	min: number;
	max: number;
	value: number;
	margin?: string;
}

const Input: React.FC<Props> = function({text, min, max, value, margin}: Props) {
	const [currentValue, setCurrentValue] = useState<string>(value.toString());
	const id = new StringBuilder(text).toLowerCase().firstWord();
	const newText = id.capitalize().concat(':');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => 
		setCurrentValue(e.currentTarget.value);

	const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		if (e.currentTarget.value === '') return setCurrentValue(value.toString());
		const newValue = parseInt(e.currentTarget.value);

		if (newValue < min) return setCurrentValue(min.toString());
		if (newValue > max) return setCurrentValue(max.toString());
	};

	return (
		<Wrapper margin={margin}>
			<Label htmlFor={id.getValue}>{newText.getValue}</Label>
			<I 
				id={id.getValue} 
				type="number" 
				min={min}
				max={max}
				value={currentValue}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</Wrapper>
	);
};

export default Input; 
