import {GameActions, CreateGameAction, RevealAction} from './actions';
import MineSweeper, {NullMineSweeper, IMineSweeper} from '../../utils/MineSweeper';

type ReducerActions = CreateGameAction | RevealAction;

export interface GameState {
	isPlaying: boolean;
	mineSweeper: IMineSweeper;
}

export const initialState: GameState = {
	isPlaying: false,
	mineSweeper: new NullMineSweeper()
};

export default function(state: GameState = initialState, action: ReducerActions): GameState {
	switch (action.type) {
		case GameActions.CREATE_GAME:
			return {
				isPlaying: true,
				mineSweeper: new MineSweeper({
					width: action.payload.width, 
					height: action.payload.height, 
					numMines: action.payload.mines
				})
			};
		case GameActions.REVEAL:
			return {
				...state,
				mineSweeper: state.mineSweeper.revealBlock(action.payload.id)
			};
		default:
			return state;
	}
}
