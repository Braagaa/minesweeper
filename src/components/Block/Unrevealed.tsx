import React from 'react';
import {connect} from 'react-redux';
import Block, {MineBlock} from '../../utils/Block';
import {revealBlock} from '../Board/actions';

import styles from './style.module.css';

const mapStateToProps = () => ({});
const mapDispatchToProps = {revealBlock};

interface Props {
	block: Block;
	revealBlock: typeof revealBlock;
}

const UnrevealedBlock = function({block, revealBlock}: Props) {
	const onClick = () => {
		revealBlock(block.id);
	};

	return (
		<div className={`${styles.block} ${styles.block__unrevealed}`} onClick={onClick}/>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UnrevealedBlock);
