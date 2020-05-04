type GameProps = 'width' | 'height' | 'mines';

interface Clamp {
	readonly initial: number;
	readonly min: number;
	readonly max: number;
}

type GameData<T extends string> = {
	[P in T]: Clamp;
}

const width: Clamp = {
	initial: 16,
	min: 9,
	max: 24
};

const height: Clamp = {
	initial: 16,
	min: 9,
	max: 30
};

const mines: Clamp = {
	initial: 40,
	min: 10,
	max: 668
};

const data: GameData<GameProps> = {width, height, mines};

export default data;
