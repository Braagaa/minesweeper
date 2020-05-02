import styled from 'styled-components';
import baseStyles from '../../baseStyles/';

export const Wrapper = styled.footer`
	color: ${baseStyles.colors.gray.dark};
	svg {
		transition: fill 0.15s ease-in;
	}

	svg:hover {
		fill: ${baseStyles.colors.red};
	}
`;

export const SocialMedias = styled.div`
	display: flex;
	justify-content: center;
`;

export const A = styled.a`
	margin: 0 2.5px;
`;

export const P = styled.p`
	text-align: center;
`;
