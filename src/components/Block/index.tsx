import React, {memo} from 'react';
import Block, {Statuses, NullBlock, NumberBlock, MineBlock} from '../../utils/Block';

import UnrevealedBlock from './Unrevealed';
import FlagBlockComponent from './Flag';
import QuestionBlockComponent from './Question';
import NullBlockComponent from './Null';
import NumberBlockComponent from './Number';
import MineBlockComponent from './Mine';

//images should be -3px of width and height of block

interface Props {
	block: Block;
}

const BlockComponent = function({block}: Props) {
	if (block.status === Statuses.UNREVEALED) {
		return <UnrevealedBlock block={block}/>;
	}

	if (block.status === Statuses.FLAGGED) {
		return <FlagBlockComponent block={block}/>;
	}

	if (block.status === Statuses.QUESTIONED) {
		return <QuestionBlockComponent block={block}/>;
	}

	const BC = block instanceof NullBlock ?
		NullBlockComponent : block instanceof MineBlock ?
		MineBlockComponent : UnrevealedBlock;

	return block instanceof NumberBlock ? (
		<NumberBlockComponent block={block}/>
	) : (
		<BC block={block}/>
	);
};

export default BlockComponent;
