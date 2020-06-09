import Block, {BlockID, Statuses, NullBlock, MineBlock, NumberBlock} from './Block';
import {complement, accumulate} from './func';
import {selectRandom2D} from './random';
import gameData, {GameProps} from '../data/';

export type NullNumber = NullBlock | NumberBlock;

export default abstract class Grid {
	constructor(
		public readonly width: number = 0,
		public readonly height: number = 0,
		public readonly numMines: number = 0,
		protected _grid: Block[][] = []
	) {}

	public static calculateMaxMines(width: number, height: number): number {
		return Math.floor(width * height * 0.9);
	}

	public static checkRanges(key: 'width' | 'height', measure: number): number {
		return measure < gameData[key].min ?
			gameData[key].min :
			measure > gameData[key].max ?
			gameData[key].max : measure;
	}

	/*
	 * Calculates max mines available to a Grid based on width and height.
	 * The mines parameter in the constructor changes if it is too high.
	 */
	public static checkMines(width: number, height: number, numMines: number): number {
		const maxMines = Grid.calculateMaxMines(width, height);
		return numMines < gameData.mines.min ?
			gameData.mines.min :
			numMines > maxMines ?
			maxMines : numMines;
	}

	public get grid() {
		return this._grid;
	}


	private checkNeighbourInBound(id: BlockID): boolean {
		return id.every(num => num >= 0) &&
			id[0] < this.height &&
			id[1] < this.width;
	}

	protected findNeighbours([h, w]: BlockID): Block[] {
		const neighbours: Block[] = [];
		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				if (x === 0 && y === 0) continue;
				const neighbourID = [h + y, w + x] as BlockID;
				if (this.checkNeighbourInBound(neighbourID))
					neighbours.push(this.grid[h + y][w + x]);
			}
		}

		return neighbours;
	}

	public validateId([y,x]: BlockID) {
		if (!this.grid[y] || !this.grid[y][x])
			throw new Error(`Invalid BlockID [${y},${x}]`);
	}

	public findAllMines(): MineBlock[] {
		return this.grid.reduce((acc: MineBlock[], height: Block[]): MineBlock[] =>
			[...acc, ...height.filter((block: Block) => block instanceof MineBlock)], []);
	}

	public findNeighboursNullNumbers([y,x]: BlockID): NullNumber[] {
		this.validateId([y,x]);

		const foundNullNumbers: NullNumber[] = [];
		let blocks: Block[] = [this.grid[y][x]];

		while (blocks.length > 0) {
			const currentBlock = blocks.pop();
			if (!foundNullNumbers.includes(currentBlock!) && currentBlock!.status === Statuses.UNREVEALED) {
				if (currentBlock instanceof NullBlock) {
					blocks = [...blocks, ...this.findNeighbours(currentBlock.id)];
					foundNullNumbers.push(currentBlock);
				} else if (currentBlock instanceof NumberBlock) {
					foundNullNumbers.push(currentBlock);
				} 
			}
		}

		return foundNullNumbers;
	}

	public toArray(): Block[] {
		return this.grid.reduce(accumulate, []);
	}
}

export class RandomGrid extends Grid {
	constructor(
		public readonly width: number = gameData.width.initial,
		public readonly height: number = gameData.height.initial,
		public readonly numMines: number = gameData.mines.initial
	) {
		super();

		this.width = Grid.checkRanges('width', width);
		this.height = Grid.checkRanges('height', height);
		this.numMines = Grid.checkMines(this.width, this.height, numMines);

		this.createGrid();
		this.placeMines();
		this.placeNumbers();
	}

	private createGrid(): void {
		for(let height = 0; height < this.height; height++) {
			this.grid[height] = [];

			for(let width = 0; width < this.width; width++) {
				this.grid[height][width] = new NullBlock([height, width]);
			}
		}
	}

	private placeMines(): void {
		const mineLocations = selectRandom2D(
			this.grid.map(h => h.map(b => b.id)), 
			this.numMines
		);

		mineLocations
			.forEach(([y, x]) =>{
				this.grid[y][x] = new MineBlock([y,x])
			});
	}

	private placeNumbers(): void {
		const findNeighboursOfMines = (acc: Block[], mineBlock: MineBlock): Block[] =>
			[...acc, ...this.findNeighbours(mineBlock.id)];
		const noMines = (block: Block): boolean => !(block instanceof MineBlock);
		const findNumberOfMines = (block: Block): [BlockID, number] =>
			[block.id, this.findNeighbours(block.id).filter(complement(noMines)).length];

		this.findAllMines()
			.reduce(findNeighboursOfMines, [])
			.filter(noMines)
			.map(findNumberOfMines)
			.forEach(([id, num]) => {
				const [y,x] = id;
				this.grid[y][x] = new NumberBlock(id, num);
			});
	}
}

export class NullGrid extends Grid {}

export class FixedGrid extends Grid {
	public readonly width: number = 0;
	public readonly height: number = 0;
	public readonly numMines: number = 0;

	constructor(
		grid: Block[][],
	) {
		super(0,0,0,grid);

		this.width = grid[0].length;
		this.height = grid.length;
		this.numMines = this.findAllMines().length;

		this.validateDimensions();
		this.validateMines();
	}

	private validateDimensions() {
		const dimensions = this.grid
			.map((width: Block[]) => width.length)
			.reduce((acc: Set<number>, length: number) => acc.add(length), new Set());

		if (dimensions.size === 0 || dimensions.size > 1)
			throw new Error('Given grid is invalid');
		if (this.grid.length < gameData.height.min || this.grid.length > gameData.height.max)
			throw new Error(`Grid height is invalid. Must be between ${gameData.height.min} - ${gameData.height.max}`);
		if (this.grid[0].length < gameData.width.min || this.grid[0].length > gameData.width.max)
			throw new Error(`Grid width is invalid. Must be between ${gameData.width.min} - ${gameData.width.max}`);
	}

	private validateMines() {
		if (this.numMines < gameData.mines.min) 
			throw new Error(`${this.numMines} is below the minimum amount of mines.`);
		if (this.numMines > Grid.calculateMaxMines(this.width, this.height))
			throw new Error(`${this.numMines} is above the maximum amount of mines.`);
	}
}
