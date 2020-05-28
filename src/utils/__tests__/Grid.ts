import Grid from '../Grid';
import Block, {BlockID, MineBlock, Statuses} from '../Block';
import gameData from '../../data/';

const {width, height, mines} = gameData;

describe('Grid Class', () => {
	it('Instantiates correctly', () => {
		const grid = new Grid();
		const grid1 = new Grid(width.min - 1, height.min - 1, mines.min - 1);
		const grid2 = new Grid(width.max + 1, height.max + 1, mines.max + 1);
		const grid3 = new Grid(9, 9, 999);

		expect(grid.width).toBe(width.initial);
		expect(grid.height).toBe(height.initial);
		expect(grid.numMines).toBe(mines.initial);

		expect(grid1.width).toBe(width.min);
		expect(grid1.height).toBe(height.min);
		expect(grid1.numMines).toBe(mines.min);

		expect(grid2.width).toBe(width.max);
		expect(grid2.height).toBe(height.max);
		expect(grid2.numMines).toBe(mines.max);
		expect(grid3.numMines).toBe(72);
	});

	it('Creates a grid', () => {
		const grid = new Grid(9, 9, 10);
		const findMines = (acc: MineBlock[], h: Block[]) =>
			[...acc, ...h.filter(b => b instanceof MineBlock)];

		expect(grid.grid.length).toBe(9);
		expect(grid.grid[0].length).toBe(9);

		expect(grid.grid.reduce(findMines, []).length).toBe(10);
	});

	it('Can find all mine blocks', () => {
		const grid = new Grid(9, 9, 10);
		const mines = grid.findAllMines()
			.filter((block: MineBlock) => block instanceof MineBlock);

		expect(mines.length).toBe(10);
	});
});
