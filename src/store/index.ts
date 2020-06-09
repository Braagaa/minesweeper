import {createStore} from 'redux';
import rootReducer, {AppState} from '../rootReducer';
import Block from '../utils/Block';
import {MineSweeper, MineSweeperJSON, MineSweeperFixed, MineSweeperStatuses} from '../utils/MineSweeper';
import {initialState as initialGameState} from '../components/Board/reducer';
import {initialState as initialInputsState} from '../components/Input/reducer';

const minesweeperLocalStorage = 'minesweeper/grid';

const initialState: AppState = {
	inputs: initialInputsState,
	game: initialGameState
};

const toString = (ms: MineSweeper, prop: 'width' | 'height' | 'numMines') =>
	ms.grid[prop].toString();

const load = (): AppState => {
	const potentialGrid = localStorage.getItem(minesweeperLocalStorage);
	if (potentialGrid === null) return initialState;

	try {
		const ms = MineSweeperFixed.fromJSON(JSON.parse(potentialGrid))
		return {
			inputs: {
				width: toString(ms, 'width'),
				height: toString(ms, 'height'),
				mines: toString(ms, 'numMines')
			},
			game: {
				isPlaying: true,
				mineSweeper: ms
			}
		};
	} catch(e) {
		return initialState;
	}
};

const store = createStore(rootReducer, load());

store.subscribe(() => {
	const {game}: AppState = store.getState();
	if (!game.isPlaying) return;

	if (game.mineSweeper.status === MineSweeperStatuses.PLAYING) {
		localStorage.setItem(
			minesweeperLocalStorage,
			JSON.stringify(store.getState().game.mineSweeper.toJSON())
		);
	} else {
		localStorage.removeItem(minesweeperLocalStorage);
	}
});

export default store;
