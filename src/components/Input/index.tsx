import React from 'react';
import {Wrapper, Input as I, Label} from './styles';
import StringBuilder from '../../utils/StringBuilder';

interface Props {
	text: string;
	value: number;
	margin?: string;
}

const Input: React.FC<Props> = function({text, value, margin}: Props) {
	const id = new StringBuilder(text).toLowerCase().firstWord();
	const newText = id.capitalize().concat(':');
	return (
		<Wrapper margin={margin}>
			<Label htmlFor={id.getValue}>{newText.getValue}</Label>
			<I id={id.getValue} type="number" value={value}/>
		</Wrapper>
	);
};

export default Input; 
