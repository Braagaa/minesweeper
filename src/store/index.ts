import {createStore} from 'redux';
import rootReducer, {AppState} from '../rootReducer';
import Block from '../utils/Block';
import Grid from '../utils/grid';
import {initialState as initialGameState} from '../components/Board/reducer';
import {initialState as initialInputsState} from '../components/Input/reducer';

const initialState: AppState = {
	inputs: initialInputsState,
	game: initialGameState
};

const isGrid = (obj: any): obj is Block[][] => {
	return Array.isArray(obj) && 
		Array.isArray(obj[0]) &&
		obj.every((h: Block[]) => h.every(b => b.discriminator === 'Block'));
};

const load = (): AppState => {
	const potentialGrid = localStorage.getItem('minesweeper/grid');
	if (potentialGrid === null) return initialState;

	const grid = JSON.parse(potentialGrid);
	if (isGrid(grid)) { 
		return {
			...initialState,
			game: {
				isPlaying: true,
				grid: new Grid()
			}
		};
	}

	return initialState;
};

const store = createStore(rootReducer, load());

export default store;
