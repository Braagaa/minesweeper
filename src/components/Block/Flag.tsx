import React from 'react';
import {connect} from 'react-redux';
import Block from '../../utils/Block';
import {contextMenu} from '../../utils/events';
import {questionBlock} from '../Board/actions';

import FlagSVG from '../../images/flag.svg';
import baseStyles, {toPixel, parsePixel} from '../../baseStyles';
import style from './style.module.css';

interface Props {
	block: Block;
	questionBlock: typeof questionBlock;
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {questionBlock};
const {block: blockCSS} = baseStyles;

const Flag = function({block, questionBlock}: Props) {
	const onContextMenu = contextMenu(questionBlock, block.id);

	return (
		<div
			className={`${style.center} ${style.block} ${style.block__flag}`}
			onContextMenu={onContextMenu}
		>
			<FlagSVG 
				fill={baseStyles.colors.red}
				width={toPixel(parsePixel(blockCSS.width) - 5)} 
				height={toPixel(parsePixel(blockCSS.height) - 5)}
			/>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Flag);
