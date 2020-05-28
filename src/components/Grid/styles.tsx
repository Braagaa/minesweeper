import baseStyles from '../../baseStyles/';

const {block} = baseStyles;

export const gridCSS = (width: number, height: number) => ({
	display: 'grid',
	gridTemplate: `repeat(${height}, ${block.height}) / repeat(${width}, ${block.width})`,
	placeContent: 'center',
	gap: '2px',
	opacity: '0.8'
});
