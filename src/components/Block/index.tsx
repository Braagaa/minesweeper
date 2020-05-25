import React, {memo} from 'react';
import Block, {Statuses, NullBlock, NumberBlock} from '../../utils/Block';

import UnrevealedBlock from './Unrevealed';
import NullBlockComponent from './Null';
import NumberBlockComponent from './Number';

//images should be -3px of width and height of block

interface Props {
	block: Block;
}

const BlockComponent = function({block}: Props) {
	if (block.status === Statuses.UNREVEALED) {
		return <UnrevealedBlock block={block}/>;
	}

	const BC = block instanceof NullBlock ?
		NullBlockComponent : UnrevealedBlock;

	return block instanceof NumberBlock ? (
		<NumberBlockComponent block={block}/>
	) : (
		<BC block={block}/>
	);
};

export default BlockComponent;
