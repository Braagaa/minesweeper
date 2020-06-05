import React from 'react';

import ConfettiSVG from '../../images/confetti.svg';
import {wrapper, text__win} from './style.module.css';

const Win = function() {
	return (
		<h2 className={wrapper}>
			<span className={text__win}>You Won!&nbsp;&nbsp;</span>
			<ConfettiSVG width="25px" height="25px"/>
		</h2>	
	);
};

export default Win;
