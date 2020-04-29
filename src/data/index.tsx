interface InitalGameState {
	width: number;
	height: number;
	mines: number;
}

interface Data {
	initalGameState: InitalGameState;
}

const data: Data = {
	initalGameState: {
		width: 16,
		height: 16,
		mines: 40
	}
};

export default data;
