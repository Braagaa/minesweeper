import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Grid from '../../utils/Grid';
import data, {GameProps} from '../../data/';
import {writeInput} from '../Input/actions';

import Input from '../Input/';

const mapStateToProps = () => ({});
const mapDispatchToProps = {writeInput};

interface Props {
	width: number;
	height: number;
	mines: number;
	writeInput: typeof writeInput;
}

const MineInput = function({width, height, mines, writeInput}: Props) {
	width = Grid.checkRanges('width', width);
	height = Grid.checkRanges('height', height);

	const maxMines = Grid.calculateMaxMines(
		width, 
		height
	);
	const numMines = isNaN(width) || isNaN(height) ?
		NaN : mines > maxMines ? 
		maxMines : mines;

	useEffect(() => {
		if (mines > maxMines)
			writeInput('mines', maxMines.toString());
	}, [mines, maxMines])

	return (
		<Input
			text="mines"
			min={data.mines.min}
			max={!isNaN(maxMines) ? maxMines : 0}
			defaultValue={data.mines.initial}
			value={numMines}
		/>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MineInput);
