import Grid, {NullGrid, IGrid}  from './grid';
import {NullBlock, BlockID, Statuses} from './Block';

interface MineSweeperProps{
	width: number;
	height: number;
	numMines: number;
}
type Props = MineSweeperProps | MineSweeper;

export interface IMineSweeper {
	readonly grid: IGrid;
	revealBlock: (id: BlockID) => IMineSweeper;
}

export class NullMineSweeper implements IMineSweeper {
	public readonly grid: IGrid = new NullGrid();
	public revealBlock(): IMineSweeper {
		return new NullMineSweeper();
	}
}

export default class MineSweeper implements IMineSweeper {
	public readonly grid: IGrid;

	constructor(props: Props = {width: 1, height: 1, numMines: 1}) {
		if (props instanceof MineSweeper) {
			this.grid = props.grid;
		} else {
			const {width, height, numMines} = props;
			this.grid = new Grid(width, height, numMines);
		}
	}

	private validateId([y,x]: BlockID) {
		if (!this.grid.grid[y] || !this.grid.grid[y][x])
			throw new Error(`Invalid BlockID [${y},${x}]`);
	}

	public revealBlock(id: BlockID): IMineSweeper {
		this.validateId(id);
		const [y,x] = id;
		this.grid.grid[y][x].status = Statuses.REVEALED;
		return new MineSweeper(this);
	}
}
