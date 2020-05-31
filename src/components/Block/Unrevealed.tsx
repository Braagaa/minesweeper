import React from 'react';
import {connect} from 'react-redux';
import {click, contextMenu} from '../../utils/events';
import Block, {MineBlock} from '../../utils/Block';
import {revealBlock, flagBlock} from '../Board/actions';

import styles from './style.module.css';

const mapStateToProps = () => ({});
const mapDispatchToProps = {revealBlock, flagBlock};

interface Props {
	block: Block;
	revealBlock: typeof revealBlock;
	flagBlock: typeof flagBlock;
}

const UnrevealedBlock = function({block, revealBlock, flagBlock}: Props) {
	const onClick = click(revealBlock, block.id);
	const onContextMenu = contextMenu(flagBlock, block.id);

	return (
		<div 
			className={`${styles.block} ${styles.block__unrevealed}`} 
			onClick={onClick}
			onContextMenu={onContextMenu}
		/>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UnrevealedBlock);
