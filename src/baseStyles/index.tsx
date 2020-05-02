type CSSColor = string;
type Pixel = string;

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

interface BlockCSS {
	width: Pixel;
	height: Pixel;
}


interface BaseStyles {
	colors: Colors;
	block: BlockCSS;
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
	},
	block: {
		width: '20px',
		height: '20px'
	}
};

export default baseStyles;
