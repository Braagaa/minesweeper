import React from 'react';
import {Props} from './index';

import baseStyles from '../../baseStyles';
import BombSVG from '../../images/bomb.svg';
import {wrapper, text__playing} from './style.module.css';

const Playing = function({numMines}: Pick<Props, 'numMines'>) {
	return (
		<h2 className={wrapper}>
			<BombSVG 
				fill={baseStyles.colors.gray.darker} 
				width="25px" 
				height="25px"
			/>
			<span className={text__playing}>&nbsp;{numMines}</span>
		</h2>	
	);
};

export default Playing;
