type CSSColor = string;

interface Colors {
	red: CSSColor;
	white: CSSColor;
	black: CSSColor;
	gray: {
		base: CSSColor;
		light: CSSColor;
		dark: CSSColor;
	}
}

interface BaseStyles {
	colors: Colors;
}

const baseStyles: BaseStyles = {
	colors: {
		red: '#FE2E2E',
		white: 'snow',
		black: '#191919',
		gray: {
			base: '#C6C6C6',
			light: '#DFDFDF',
			dark: '#ACACAC'
		}
	}
};

export default baseStyles;
