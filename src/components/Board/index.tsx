import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../rootReducer';

import Status from '../Status/';
import Grid from '../Grid/';
import {Wrapper} from './styles';
import Start from '../Start/';

const mapStateToProps = (state: AppState) => ({
	isPlaying: state.game.isPlaying
});

interface Props {
	isPlaying: Boolean;
}

const Board: React.FC<Props> = function({isPlaying}: Props) {
	return isPlaying ? (
		<Wrapper>
			<Status/>
			<Grid/>
		</Wrapper>
	) : (
		<Start/>
	);
};

export default connect(
	mapStateToProps
)(Board);
