type CSSColor = string;

interface Colors {
	red: CSSColor;
	white: CSSColor;
	black: CSSColor;
}

interface BaseStyles {
	colors: Colors;
}

const baseStyles: BaseStyles = {
	colors: {
		red: '#FE2E2E',
		white: 'snow',
		black: '#191919'
	}
};

export default baseStyles;
