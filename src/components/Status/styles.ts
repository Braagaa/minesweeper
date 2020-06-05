import styled from 'styled-components';
import baseStyles from '../../baseStyles/';

export const Wrapper = styled.h2`
	text-align: center;
`;

export const Span = styled.span`
	vertical-align: 4px;
	color: ${baseStyles.colors.gray.darker};
`;

export const WinSpan = styled(Span)`
	color: ${baseStyles.colors.green};
`;

export const LoseSpan = styled(Span)`
	color: ${baseStyles.colors.red};
`
