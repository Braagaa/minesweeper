import React from 'react';
import {connect} from 'react-redux';
import {callTo} from '../../utils/func';
import Block from '../../utils/Block';
import {revealBlock} from '../Board/actions';

import {UnrevealedWrapper} from './styles';

const mapStateToProps = () => ({});
const mapDispatchToProps = {revealBlock};

interface Props {
	block: Block;
	revealBlock: typeof revealBlock;
}

const UnrevealedBlock = function({block, revealBlock}: Props) {
	const onClick = callTo(revealBlock, block.id);

	return (
		<UnrevealedWrapper onClick={onClick}/>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UnrevealedBlock);
