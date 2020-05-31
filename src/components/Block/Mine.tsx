import React from 'react';
import baseStyles, {parsePixel, toPixel} from '../../baseStyles';

import MineSVG from '../../images/bomb.svg';
import styles from './style.module.css';

const {block: blockCSS} = baseStyles;

const Mine = function() {
	return (
		<div 
			className={`${styles.center} ${styles.block} ${styles.block__mine}`} 
		>
			<MineSVG 
				fill="black"
				width={toPixel(parsePixel(blockCSS.width) - 5)} 
				height={toPixel(parsePixel(blockCSS.height) - 5)}
			/>
		</div>
	);
}

export default Mine;
