import React from 'react';

import {Wrapper, H1, Img} from './styles';
import pointFingerPNG from '../../images/point-finger.png';

const Start = function() {
	return (
		<Wrapper>
			<H1>Start Game Above</H1>
			<Img src={pointFingerPNG}/>
		</Wrapper>
	);
};

export default Start;
