import React from 'react';
import {NumberBlock} from '../../utils/Block';

import styles from './style.module.css';

interface Props {
	block: NumberBlock;
}

const Num = function({block}: Props) {
	return (
		<div className={`${styles.block} ${styles.block__number}`}>
			<span className={styles.number__text}>{block.number}</span>
		</div>
	);
};

export default Num;
