import {GameActions, CreateGameAction} from './actions';
import Grid from '../../utils/grid';

type ReducerActions = CreateGameAction;

export interface GameState {
	isPlaying: boolean;
	grid: Grid | null;
}

export const initialState: GameState = {
	isPlaying: false,
	grid: null
};

export default function(state: GameState = initialState, action: ReducerActions): GameState {
	switch (action.type) {
		case GameActions.CREATE_GAME:
			return {
				isPlaying: true,
				grid: new Grid(
					action.payload.width, 
					action.payload.height, 
					action.payload.mines
				)
			};
		default:
			return state;
	}
}
