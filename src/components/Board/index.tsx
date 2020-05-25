import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../rootReducer';

import Status from '../Status/';
import Grid from '../Grid/';
import {Wrapper} from './styles';
import Start from '../Start/';

const mapStateToProps = (state: AppState) => ({
	isPlaying: state.game.isPlaying,
	numMines: state.game.mineSweeper.grid.numMines
});

interface Props {
	isPlaying: boolean;
	numMines: number;
}

const Board: React.FC<Props> = function({isPlaying, numMines}: Props) {
	return isPlaying ? (
		<Wrapper>
			<Status numMines={numMines}/>
			<Grid/>
		</Wrapper>
	) : (
		<Start/>
	);
};

export default connect(
	mapStateToProps
)(Board);
