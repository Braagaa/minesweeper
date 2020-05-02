import styled from 'styled-components';
import baseStyles from '../../baseStyles/';

export const Wrapper = styled.div`
	width: ${baseStyles.block.width};
	height: ${baseStyles.block.height};
	background: ${baseStyles.colors.gray.base};
	border-radius: 3px;
	border: 1px solid ${baseStyles.colors.gray.dark};
	cursor: pointer;
	transition: background 0.15s ease-out;

	:hover {
		background: ${baseStyles.colors.black};
	}
`;
