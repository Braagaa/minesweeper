import {createGlobalStyle} from 'styled-components';
import baseStyles from './baseStyles/';
import BalooBhaina from './fonts/BalooBhaina2-Medium.ttf';

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Baloo Bhaina 2';
		src: url("${BalooBhaina}") format("TrueType");
	}

	* {
		font-family: 'Baloo Bhaina 2';
		box-sizing: border-box;
	}

	html {
		background: ${baseStyles.colors.white};
	}
`;
