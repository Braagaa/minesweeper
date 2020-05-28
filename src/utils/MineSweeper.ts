import Grid, {NullGrid, IGrid}  from './grid';
import {NullBlock, MineBlock, BlockID, Statuses} from './Block';

export enum MineSweeperStatuses {
	PLAYING,
	WIN,
	LOSE
}

interface MineSweeperProps{
	width: number;
	height: number;
	numMines: number;
}
type Props = MineSweeperProps | MineSweeper;

export interface IMineSweeper {
	readonly grid: IGrid;
	revealBlock: (id: BlockID) => IMineSweeper;
	status: () => MineSweeperStatuses;
}

export class NullMineSweeper implements IMineSweeper {
	public readonly grid: IGrid = new NullGrid();
	public revealBlock(): IMineSweeper {
		return new NullMineSweeper();
	}
	public status() {
		return MineSweeperStatuses.PLAYING;
	}
}

export default class MineSweeper implements IMineSweeper {
	public readonly grid: IGrid;
	private _status: MineSweeperStatuses = MineSweeperStatuses.PLAYING;

	constructor(props: Props = {width: 1, height: 1, numMines: 1}) {
		if (props instanceof MineSweeper) {
			this.grid = props.grid;
			this._status = props._status;
		} else {
			const {width, height, numMines} = props;
			this.grid = new Grid(width, height, numMines);
		}
	}

	private loseGame(): void {
		this.grid.findAllMines()
			.forEach((block: MineBlock) => block.status = Statuses.REVEALED);
		this._status = MineSweeperStatuses.LOSE;
	}

	private revealNullNumberBlocks(id: BlockID): void {
		this.grid.findNeighboursNullNumbers(id)
			.filter(block => block.status === Statuses.UNREVEALED)
			.forEach(block => block.status = Statuses.REVEALED);
	}

	public revealBlock(id: BlockID): IMineSweeper {
		if (this._status !== MineSweeperStatuses.PLAYING) {
			return new MineSweeper(this);
		}

		this.grid.validateId(id);
		const [y,x] = id;
		const block = this.grid.grid[y][x];

		if (block instanceof MineBlock) {
			this.loseGame();
		} else if (block instanceof NullBlock) {
			this.revealNullNumberBlocks(id);
		} else {
			this.grid.grid[y][x].status = Statuses.REVEALED;
		}

		return new MineSweeper(this);
	}

	public status() {
		return this._status;
	}
}
