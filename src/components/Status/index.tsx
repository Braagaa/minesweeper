import React from 'react';
import data from '../../data/';

import BombSVG from '../../images/bomb.svg';
import {Wrapper, Span} from './styles';

const Status = function() {
	return (
		<Wrapper>
			<BombSVG width="25px" height="25px"/>
			<Span>&nbsp;{data.initalGameState.mines}</Span>
		</Wrapper>	
	);
};

export default Status;
