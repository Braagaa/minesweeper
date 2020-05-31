import Grid, {NullGrid, IGrid}  from './grid';
import Block, {NullBlock, MineBlock, BlockID, Statuses} from './Block';

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
	flagBlock: (id: BlockID) => IMineSweeper;
	questionBlock: (id: BlockID) => IMineSweeper;
	unrevealBlock: (id: BlockID) => IMineSweeper;
	status: () => MineSweeperStatuses;
}

export class NullMineSweeper implements IMineSweeper {
	public readonly grid: IGrid = new NullGrid();
	public revealBlock(): IMineSweeper {
		return new NullMineSweeper();
	}
	public flagBlock(): IMineSweeper {
		return new NullMineSweeper();
	}
	public questionBlock(): IMineSweeper {
		return new NullMineSweeper();
	}
	public unrevealBlock(): IMineSweeper {
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
			.forEach(block => block.status = Statuses.REVEALED);
	}

	private checkPlayable(): boolean {
		return this._status !== MineSweeperStatuses.PLAYING;
	}

	private getBlock([y,x]: BlockID): Block {
		this.grid.validateId([y,x]);
		return this.grid.grid[y][x];
	}

	private changeBlockStatus(check: Statuses, change: Statuses, id: BlockID): IMineSweeper {
		if (this.checkPlayable()) {
			return new MineSweeper(this);
		}

		const block = this.getBlock(id);
		
		if (block.status === check) {
			block.status = change;
		}

		return new MineSweeper(this);
	}

	public revealBlock(id: BlockID): IMineSweeper {
		if (this.checkPlayable()) {
			return new MineSweeper(this);
		}

		const block = this.getBlock(id);

		if (block instanceof MineBlock) {
			this.loseGame();
		} else if (block instanceof NullBlock) {
			this.revealNullNumberBlocks(id);
		} else {
			block.status = Statuses.REVEALED;
		}

		return new MineSweeper(this);
	}

	public flagBlock(id: BlockID): IMineSweeper {
		return this.changeBlockStatus(
			Statuses.UNREVEALED, 
			Statuses.FLAGGED, 
			id
		);
	}

	public questionBlock(id: BlockID): IMineSweeper {
		return this.changeBlockStatus(
			Statuses.FLAGGED,
			Statuses.QUESTIONED,
			id
		);
	}

	public unrevealBlock(id: BlockID): IMineSweeper {
		return this.changeBlockStatus(
			Statuses.QUESTIONED,
			Statuses.UNREVEALED,
			id
		);
	}

	public status() {
		return this._status;
	}
}
