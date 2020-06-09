import Grid, {FixedGrid, NullGrid, RandomGrid}  from './grid';
import Block, {NullBlock, NumberBlock, MineBlock, BlockID, Statuses, BlockJSON} from './Block';
import gameData from '../data/';

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
export interface MineSweeperJSON {
	status: MineSweeperStatuses;
	flagsLeft: number;
	grid: BlockJSON[][];
}

type Props = MineSweeperProps | MineSweeper;

export default abstract class MineSweeperBase {
	constructor(
		public readonly grid: Grid,
		protected _flagsLeft: number,
		protected _status: MineSweeperStatuses = MineSweeperStatuses.PLAYING,
	){}

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

	private checkWin(): boolean {
		return this._flagsLeft === 0 &&
			this.grid
			.findAllMines()
			.every((block: Block) => block.status === Statuses.FLAGGED) &&
			this.grid
				.toArray()
				.every((block: Block) => block.status === Statuses.REVEALED || block.status === Statuses.FLAGGED);
	}

	private maybeWinGame() {
		if (this.checkWin()) {
			this._status = MineSweeperStatuses.WIN;
		}
	}

	private changeBlock(id: BlockID, callback: (block: Block) => void): MineSweeperBase {
		if (this.checkPlayable()) {
			return new MineSweeper(this);
		}

		const block = this.getBlock(id);
		callback(block);

		return new MineSweeper(this);
	}

	public revealBlock(id: BlockID): MineSweeperBase {
		return this.changeBlock(id, (block: Block) => {
			if (block instanceof MineBlock) {
				this.loseGame();
			} else if (block instanceof NullBlock) {
				this.revealNullNumberBlocks(id);
				this.maybeWinGame();
			} else {
				block.status = Statuses.REVEALED;
				this.maybeWinGame();
			}
		});
	}

	public flagBlock(id: BlockID): MineSweeperBase {
		return this.changeBlock(id, (block: Block) => {
			if (this._flagsLeft > 0 && block.status === Statuses.UNREVEALED) {
				block.status = Statuses.FLAGGED;
				this._flagsLeft--;
				this.maybeWinGame();
			}
		});
	}

	public questionBlock(id: BlockID): MineSweeperBase {
		return this.changeBlock(id, (block: Block) => {
			if (this._flagsLeft < this.grid.numMines && block.status === Statuses.FLAGGED) {
				block.status = Statuses.QUESTIONED;
				this._flagsLeft++;
			}
		});
	}

	public unrevealBlock(id: BlockID): MineSweeperBase {
		return this.changeBlock(id, (block: Block) => {
			if (block.status === Statuses.QUESTIONED) {
				block.status = Statuses.UNREVEALED;
			}
		});
	}

	public toJSON(): MineSweeperJSON {
		return {
			flagsLeft: this._flagsLeft,
			status: this._status,
			grid: this.grid
				.grid
				.map((width: Block[]) => width.map((block: Block) => ({
					id: block.id,
					status: block.status,
					isMine: block instanceof MineBlock,
					number: block instanceof NumberBlock ? block.number : 0
				})))
		};
	}

	public get flagsLeft(): number {
		return this._flagsLeft;
	}

	public get status(): MineSweeperStatuses {
		return this._status;
	}
}

export class MineSweeper extends MineSweeperBase {
	constructor(props: Props = {width: 1, height: 1, numMines: 1}) {
		if (props instanceof MineSweeperBase) {
			super(props.grid, props._flagsLeft, props._status);
		} else {
			const {width, height, numMines} = props;
			super(new RandomGrid(width, height, numMines), numMines);
		}
	}
}

export class NullMineSweeper extends MineSweeperBase {
	constructor() {
		super(new NullGrid(), 0, MineSweeperStatuses.LOSE);
	}
}

export class MineSweeperFixed extends MineSweeperBase {
	constructor(
		grid: Block[][], 
		flagsLeft: number,
		status: MineSweeperStatuses
	) {
		super(new FixedGrid(grid), flagsLeft, status);
	}

	public static produceGrid(grid: BlockJSON[][]): Block[][] {
		return grid.map((width: BlockJSON[]): Block[] =>
			width.map((block: BlockJSON): Block => {
				const newBlock: Block = block.isMine ?
					new MineBlock(block.id) : block.number > 0 ?
					new NumberBlock(block.id, block.number) :
					new NullBlock(block.id)
				newBlock.status = block.status;
				return newBlock;
			})
		);
	}

	public static fromJSON(props: MineSweeperJSON): MineSweeperFixed {
		return new MineSweeperFixed(
			MineSweeperFixed.produceGrid(props.grid),
			props.flagsLeft,
			//we can validate this if we dont want players to cheat by going to localStorage
			props.status 
		);
	}
}
