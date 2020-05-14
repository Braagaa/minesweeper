type CSSColor = string;
type Pixel = string;

interface Colors {
	red: CSSColor;
	white: CSSColor;
	black: {
		base: CSSColor;
		light: CSSColor;
	}
	gray: {
		base: CSSColor;
		light: CSSColor;
		dark: CSSColor;
		darker: CSSColor;
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
		black: {
			base: '#191919',
			light: '#323232'
		},
		gray: {
			base: '#C6C6C6',
			light: '#DFDFDF',
			dark: '#ACACAC',
			darker: 'dimgray'
		}
	},
	block: {
		width: '20px',
		height: '20px'
	}
};

export default baseStyles;
