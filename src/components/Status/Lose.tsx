import React from 'react';

import CryingSVG from '../../images/crying.svg';
import {wrapper, text__lose} from './style.module.css';

const Lose = function() {
	return (
		<h2 className={wrapper}>
			<span className={text__lose}>Game Over&nbsp;&nbsp;</span>
			<CryingSVG width="25px" height="25px"/>
		</h2>	
	);
};

export default Lose;
