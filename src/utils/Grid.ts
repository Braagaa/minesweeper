import Block, {BlockID, Statuses, NullBlock, MineBlock, NumberBlock} from './Block';
import {complement} from './func';
import {selectRandom2D} from './random';
import gameData from '../data/';

export default class Grid {
	public grid: Block[][] = [];

	constructor(
		public readonly width: number = gameData.width.initial, 
		public readonly height: number = gameData.height.initial,
		public readonly mines: number = gameData.mines.initial
	) {
		this.width = this.checkRanges('width', width);
		this.height = this.checkRanges('height', height);
		this.mines = this.checkMines(mines);
		this.createGrid();
		this.placeMines();
		this.placeNumbers();
	}

	private checkRanges(key: 'width' | 'height', measure: number): number {
		return measure < gameData[key].min ?
			gameData[key].min :
			measure > gameData[key].max ?
			gameData[key].max : measure;
	}

	/*
	 * Calculates max mines available to a Grid based on width and height.
	 * The mines parameter in the constructor changes if it is too high.
	 */
	private checkMines(mines: number): number {
		const maxMines = Math.floor(this.width * this.height * 0.9);
		return mines < gameData.mines.min ?
			gameData.mines.min :
			mines > maxMines ?
			maxMines : mines;
	}

	private checkNeighbourInBound(id: BlockID): boolean {
		return id.every(num => num >= 0) &&
			id[0] < this.height &&
			id[1] < this.width;
	}

	private findNeighbours([h, w]: BlockID): Block[] {
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

	private placeMines(): void {
		const mineLocations = selectRandom2D(
			this.grid.map(h => h.map(b => b.id)), 
			this.mines
		);

		mineLocations
			.forEach(([y, x]) =>{
				this.grid[y][x] = new MineBlock([y,x])
			});
	}

	private placeNumbers(): void {
		const findAllMines = (acc: MineBlock[], height: Block[]): MineBlock[] =>
			[...acc, ...height.filter((block: Block) => block instanceof MineBlock)];
		const findNeighboursOfMines = (acc: Block[], mineBlock: MineBlock): Block[] =>
			[...acc, ...this.findNeighbours(mineBlock.id)];
		const noMines = (block: Block): boolean => !(block instanceof MineBlock);
		const findNumberOfMines = (block: Block): [BlockID, number] =>
			[block.id, this.findNeighbours(block.id).filter(complement(noMines)).length];

		const mineLocations = this.grid
			.reduce(findAllMines, [])
			.reduce(findNeighboursOfMines, [])
			.filter(noMines)
			.map(findNumberOfMines)
			.forEach(([id, num]) => {
				const [y,x] = id;
				this.grid[y][x] = new NumberBlock(id, num);
			});
	}

	private createGrid(): void {
		for(let height = 0; height < this.height; height++) {
			this.grid[height] = [];

			for(let width = 0; width < this.width; width++) {
				this.grid[height][width] = new NullBlock([height, width]);
			}
		}
	}
}
