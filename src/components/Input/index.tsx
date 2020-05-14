import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import StringBuilder from '../../utils/StringBuilder';
import {AppState} from '../../rootReducer';
import {createInput, writeInput, WriteInputAction} from './actions';
import {InputState} from './reducer';

import {Wrapper, Input as I, Label} from './styles';

interface Props {
	text: string;
	min: number;
	max: number;
	value: number;
	createInput: typeof createInput;
	writeInput: typeof writeInput;
	inputs: InputState;
	margin?: string;
}

const mapStateToProps = (state: AppState) => ({
	inputs: state.inputs
});
const mapDispatchToProps = {createInput, writeInput};

const Input: React.FC<Props> = function({text, min, max, value, createInput, writeInput, inputs, margin}: Props) {
	const id = new StringBuilder(text).toLowerCase().firstWord();
	const newText = id.capitalize().concat(':');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): WriteInputAction =>
		writeInput(text, e.currentTarget.value);

	const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		if (e.currentTarget.value === '') {
			writeInput(text, value.toString());
		} else {
			const newValue = parseInt(e.currentTarget.value);
			if (newValue < min) writeInput(text, min.toString());
			if (newValue > max) writeInput(text, max.toString());
		}
	};

	useEffect(() => {
		createInput(text, value.toString());
	}, []);

	return (
		<Wrapper margin={margin}>
			<Label htmlFor={id.getValue}>{newText.getValue}</Label>
			<I 
				id={id.getValue} 
				type="number" 
				min={min}
				max={max}
				value={inputs[text] || value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</Wrapper>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Input);
