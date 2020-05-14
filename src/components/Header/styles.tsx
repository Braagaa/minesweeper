import styled from 'styled-components';
import baseStyles from '../../baseStyles/';

export const Wrapper = styled.header`
	background: ${baseStyles.colors.black.base};
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0 10px 20px;
	margin-bottom: 10px;

	@media (min-width: 845px) {
		padding-bottom: 0;
	}
`;

export const InputWrapper = styled.div`
	width: 490px;
	order: 3;
	display: flex;
	margin-left: auto;

	div {
		margin: auto 0;
		margin-left: 20px;
	}

	@media (min-width: 845px) {
		order: 2;
		margin-left: 0;
	}
`;

export const Title = styled.h1`
	color: ${baseStyles.colors.white};
	font-weight: bold;
`;

export const Button = styled.button`
	order: 2;
	background: ${baseStyles.colors.red};
	color: ${baseStyles.colors.white};
	font-size: 1em;
	height: 50px;
	width: 130px;
	margin: auto 0;
	margin-left: auto;
	border-radius: 5px;
	cursor: pointer;
	border: none;
	outline: none;

	@media (min-width: 845px) {
		order: 3;
	}
`;
