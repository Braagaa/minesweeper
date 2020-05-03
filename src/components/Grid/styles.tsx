import styled from 'styled-components';
import baseStyles from '../../baseStyles/';

const {block} = baseStyles;

export const Wrapper = styled.div<{width: number, height: number}>`
	display: grid;
	${props => `grid-template: repeat(${props.height}, ${block.height}) / repeat(${props.width}, ${block.width});`};
	place-content: center;
	gap: 2px;
	opacity: 0.8;
`;
