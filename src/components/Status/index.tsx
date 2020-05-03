import React from 'react';
import data from '../../data/';
import baseStyles from '../../baseStyles/';

import BombSVG from '../../images/bomb.svg';
import {Wrapper, Span} from './styles';

const Status = function() {
	return (
		<Wrapper>
			<BombSVG 
				fill={baseStyles.colors.gray.darker} 
				width="25px" 
				height="25px"
			/>
			<Span>&nbsp;{data.initalGameState.mines}</Span>
		</Wrapper>	
	);
};

export default Status;
