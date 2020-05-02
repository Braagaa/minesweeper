import React from 'react';
import data from '../../data/';

import Block from '../Block/';
import {Wrapper} from './styles';

const {initalGameState} = data;

const createGridBlock = function(_: string, i: number) {
	return (
		<Block key={i}/>
	);
};

const Grid = function() {
	return (
		<Wrapper 
			width={initalGameState.width} 
			height={initalGameState.height}
		>
			{
				''.padStart(initalGameState.width * initalGameState.height, '0')
					.split('')
					.map(createGridBlock)
			}
		</Wrapper>
	);
};

export default Grid;
