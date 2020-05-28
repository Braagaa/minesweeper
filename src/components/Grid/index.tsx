import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../rootReducer';
import {IMineSweeper} from '../../utils/MineSweeper';
import Block from '../../utils/Block';

import BlockComponent from '../Block/';
import {gridCSS} from './styles';

const mapStateToProps = (state: AppState) => ({
	mineSweeper: state.game.mineSweeper
});

const createGridBlock = function(block: Block) {
	return (
		<BlockComponent key={block.id.toString()} block={block}/>
	);
};

interface Props {
	mineSweeper: IMineSweeper;
}

const GridComponent = function({mineSweeper}: Props) {
	return (
		<div style={gridCSS(mineSweeper.grid.width, mineSweeper.grid.height)}>
			{
				mineSweeper.grid.toArray().map(createGridBlock)
			}
		</div>
	);
};

export default connect(
	mapStateToProps
)(GridComponent);
