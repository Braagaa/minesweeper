import MineSweeper, {MineSweeperStatuses} from '../MineSweeper';
import Block, {BlockID, MineBlock, NullBlock, NumberBlock, Statuses} from '../Block';

describe('MineSweeper Class', () => {
	it('Instantiates with BlockGrid', () => {
		const ms = new MineSweeper({width: 9, height: 9, numMines: 10});
		const ms1 = new MineSweeper(ms);

		expect(ms.grid.width).toBe(9);
		expect(ms.grid.height).toBe(9);
		expect(ms.grid.numMines).toBe(10);

		expect(ms1.grid.width).toBe(9);
		expect(ms1.grid.height).toBe(9);
		expect(ms1.grid.numMines).toBe(10);
	});

	it('Reveals Blocks', () => {
		const ms = new MineSweeper({width: 9, height: 9, numMines: 10});
		const result = ms.revealBlock([0,0]);
		const toError = (id: BlockID) => () => ms.revealBlock(id)

		expect(result.grid.grid[0][0].status).toBe(Statuses.REVEALED);
		expect(toError([-1,0])).toThrow();
		expect(toError([0,-1])).toThrow();
		expect(toError([9,0])).toThrow();
		expect(toError([0,9])).toThrow();
	});

	it('Flags a Block', () => {
		const ms = new MineSweeper({width: 9, height: 9, numMines: 10})
			.flagBlock([0,0]);
		const toError = (id: BlockID) => () => ms.revealBlock(id)

		expect(ms.grid.grid[0][0].status).toBe(Statuses.FLAGGED);
		expect(toError([-1,0])).toThrow();
	});

	it('Will lose the game', () => {
		const ms = new MineSweeper({width: 9, height: 9, numMines: 10})
		const mines = ms.grid
			.toArray()
			.filter((block: Block) => block instanceof MineBlock);

		const ms1 = ms.revealBlock(mines[0].id);
			
		const blocks = ms1.grid
			.toArray()
			.filter((block: Block) => !(block instanceof MineBlock) && block.status === Statuses.UNREVEALED);

		expect(ms.status()).toBe(MineSweeperStatuses.LOSE);
		expect(blocks.length).toBe(9 * 9 - 10);
	});
});
