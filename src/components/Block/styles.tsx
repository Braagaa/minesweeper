import styled from 'styled-components';
import baseStyles from '../../baseStyles/';
import Block, {Statuses, NullBlock, NumberBlock} from '../../utils/Block';

const baseProps = `
	width: ${baseStyles.block.width};
	height: ${baseStyles.block.height};
	border-radius: 3px;
	border: 1px solid ${baseStyles.colors.gray.dark};
	cursor: pointer;
`;

export const UnrevealedWrapper = styled.div`
	${baseProps}
	background: ${baseStyles.colors.gray.dark};
	transition: background 0.15s ease-out;

	:hover {
		background: ${baseStyles.colors.black.base};
	}
`;

export const NullWrapper = styled.div`
	${baseProps}
	background: ${baseStyles.colors.white};
`;

export const NumberWrapper = styled.div`
	${baseProps}
	background: ${baseStyles.colors.black.light};
	position: relative;
`;

export const NumberText = styled.span`
	text-align: center;
	color: ${baseStyles.colors.white};
	position: absolute;
	top: -5px;
	left: 0;
	right: 0;
`;
