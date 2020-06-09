import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../rootReducer';
import {MineSweeperStatuses} from '../../utils/MineSweeper';
import baseStyles from '../../baseStyles/';

import Playing from './Playing';
import Win from './Win';
import Lose from './Lose';

const mapStateToProps = (state: AppState) => ({
	numMines: state.game.mineSweeper.flagsLeft,
	gameStatus: state.game.mineSweeper.status
});

export interface Props {
	numMines: number;
	gameStatus: MineSweeperStatuses;
}

const Status = function({numMines, gameStatus}: Props) {
	if (gameStatus === MineSweeperStatuses.PLAYING) {
		return <Playing numMines={numMines}/>;
	}

	const StatusComponent = gameStatus === MineSweeperStatuses.WIN ?
		Win : Lose;

	return (
		<StatusComponent/>
	);
};

export default connect(
	mapStateToProps
)(Status);
