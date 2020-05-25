import React from 'react';
import baseStyles from '../../baseStyles/';

import BombSVG from '../../images/bomb.svg';
import {Wrapper, Span} from './styles';

interface Props {
	numMines: number;
}

const Status = function({numMines}: Props) {
	return (
		<Wrapper>
			<BombSVG 
				fill={baseStyles.colors.gray.darker} 
				width="25px" 
				height="25px"
			/>
			<Span>&nbsp;{numMines}</Span>
		</Wrapper>	
	);
};

export default Status;
