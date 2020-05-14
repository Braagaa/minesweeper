import styled from 'styled-components';
import baseStyles from '../../baseStyles';

export const Wrapper = styled.div<{margin?: string}>`
	${props => props.margin ? `margin: ${props.margin};` : ''};
`;

export const Label = styled.label`
	color: ${baseStyles.colors.white};
	margin-right: 5px;
`;

export const Input = styled.input`
	background: ${baseStyles.colors.white};
	color: ${baseStyles.colors.black.base};
	border-radius: 5px;
	outline: none;
	text-align: center;
	width: 90px;
	height: 35px;
	border: none;
	font-size: 1em;
	font-weight: bold;
`;
