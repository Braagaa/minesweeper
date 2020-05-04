import React from 'react';
import data from '../../data/';

import Block from '../Block/';
import {Wrapper} from './styles';

const {width, height} = data;

const createGridBlock = function(_: string, i: number) {
	return (
		<Block key={i}/>
	);
};

const Grid = function() {
	return (
		<Wrapper 
			width={width.initial} 
			height={height.initial}
		>
			{
				''.padStart(width.initial * height.initial, '0')
					.split('')
					.map(createGridBlock)
			}
		</Wrapper>
	);
};

export default Grid;
