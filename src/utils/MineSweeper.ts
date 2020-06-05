import Grid, {NullGrid, IGrid}  from './grid';
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
interface MineSweeperJSONProps {
	mines: BlockID[];
	status: MineSweeperStatuses;
	grid: BlockJSON[][];
}

type Props = MineSweeperProps | MineSweeper;

export interface IMineSweeper {
	readonly grid: IGrid;
	revealBlock: (id: BlockID) => IMineSweeper;
	flagBlock: (id: BlockID) => IMineSweeper;
	questionBlock: (id: BlockID) => IMineSweeper;
	unrevealBlock: (id: BlockID) => IMineSweeper;
	flagsLeft: () => number;
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
	public flagsLeft(): number {
		return 0;
	}
}

export class MineSweeperJSON {
	public readonly grid: BlockJSON[][];

	constructor({mines, status, grid}: MineSweeperJSONProps) {
		this.checkMines(grid[0].length, grid.length, mines.length);
		this.checkDimensions(grid);
		this.grid = grid;
	}

	private checkDimensions(grid: BlockJSON[][]) {
		const dimensions = grid
			.map((width: BlockJSON[]) => width.length)
			.reduce((acc: Set<number>, length: number) => acc.add(length), new Set());

		if (dimensions.size === 0 || dimensions.size > 1)
			throw new Error('Given grid is invalid');
		if (grid.length < gameData.height.min || grid.length > gameData.height.max)
			throw new Error(`Grid height is invalid. Must be between ${gameData.height.max} - ${gameData.height.max}`);
		if (grid[0].length < gameData.width.min || grid.length > gameData.width.max)
			throw new Error(`Grid width is invalid. Must be between ${gameData.width.max} - ${gameData.width.max}`);
	}

	private checkMines(width: number, height: number, numMines: number) {
		if (numMines < gameData.mines.min) 
			throw new Error(`${numMines} is below the minimum amount of mines.`);
		if (numMines > Grid.calculateMaxMines(width, height))
			throw new Error(`${numMines} is above the maximum amount of mines.`);
		
	}

	public produceGrid(): Block[][] {
		return this.grid.map((width: BlockJSON[]): Block[] =>
			width.map((block: BlockJSON): Block => {
				const newBlock: Block = block.isMine ?
					new MineBlock(block.id) : block.number ?
					new NumberBlock(block.id, block.number) :
					new NullBlock(block.id)
				newBlock.status = block.status;
				return newBlock;
			})
		);
	}
}

export default class MineSweeper implements IMineSweeper {
	public readonly grid: IGrid;
	private _flagsLeft: number;
	private _status: MineSweeperStatuses = MineSweeperStatuses.PLAYING;

	constructor(props: Props = {width: 1, height: 1, numMines: 1}) {
		if (props instanceof MineSweeper) {
			this.grid = props.grid;
			this._status = props._status;
			this._flagsLeft = props._flagsLeft;
		} else {
			const {width, height, numMines} = props;
			this.grid = new Grid(width, height, numMines);
			this._flagsLeft = numMines;
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

	private changeBlock(id: BlockID, callback: (block: Block) => void): IMineSweeper {
		if (this.checkPlayable()) {
			return new MineSweeper(this);
		}

		const block = this.getBlock(id);
		callback(block);

		return new MineSweeper(this);
	}

	public revealBlock(id: BlockID): IMineSweeper {
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

	public flagBlock(id: BlockID): IMineSweeper {
		return this.changeBlock(id, (block: Block) => {
			if (this._flagsLeft > 0 && block.status === Statuses.UNREVEALED) {
				block.status = Statuses.FLAGGED;
				this._flagsLeft--;
				this.maybeWinGame();
			}
		});
	}

	public questionBlock(id: BlockID): IMineSweeper {
		return this.changeBlock(id, (block: Block) => {
			if (this._flagsLeft < this.grid.numMines && block.status === Statuses.FLAGGED) {
				block.status = Statuses.QUESTIONED;
				this._flagsLeft++;
			}
		});
	}

	public unrevealBlock(id: BlockID): IMineSweeper {
		return this.changeBlock(id, (block: Block) => {
			if (block.status === Statuses.QUESTIONED) {
				block.status = Statuses.UNREVEALED;
			}
		});
	}

	public flagsLeft(): number {
		return this._flagsLeft;
	}

	public status() {
		return this._status;
	}
}
