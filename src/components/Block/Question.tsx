import React from 'react';
import {connect} from 'react-redux';
import Block from '../../utils/Block';
import {contextMenu} from '../../utils/events';
import {unrevealBlock} from '../Board/actions';

import QuestionSVG from '../../images/question-mark.svg';
import baseStyles, {toPixel, parsePixel} from '../../baseStyles';
import style from './style.module.css';

const {block: blockCSS} = baseStyles;
const mapStateToProps = () => ({});
const mapDispatchToProps = {unrevealBlock};

interface Props {
	block: Block;
	unrevealBlock: typeof unrevealBlock;
}

const Question = function({block, unrevealBlock}: Props) {
	const onContextMenu = contextMenu(unrevealBlock, block.id);

	return (
		<div
			className={`${style.center} ${style.block} ${style.block__flag}`}
			onContextMenu={onContextMenu}
		>
			<QuestionSVG
				fill={baseStyles.colors.red}
				width={toPixel(parsePixel(blockCSS.width) - 5)} 
				height={toPixel(parsePixel(blockCSS.height) - 5)}
			/>
		</div>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Question);
