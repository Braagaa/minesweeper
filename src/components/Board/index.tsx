import React from 'react';

import Status from '../Status/';
import Grid from '../Grid/';
import {Wrapper} from './styles';

const Board = function() {
	return (
		<Wrapper>
			<Status/>
			<Grid/>
		</Wrapper>
	);
};

export default Board;
