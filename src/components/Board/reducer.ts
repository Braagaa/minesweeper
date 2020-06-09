import {
	GameActions, 
	CreateGameAction, 
	RevealAction, 
	FlagAction, 
	QuestionAction, 
	UnrevealAction
} from './actions';
import MineSweeperBase, {NullMineSweeper, MineSweeper} from '../../utils/MineSweeper';

type ReducerActions = CreateGameAction | RevealAction | FlagAction | QuestionAction | UnrevealAction;

export interface GameState {
	isPlaying: boolean;
	mineSweeper: MineSweeperBase;
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
		case GameActions.FLAG:
			return {
				...state,
				mineSweeper: state.mineSweeper.flagBlock(action.payload.id)
			};
		case GameActions.QUESTION:
			return {
				...state,
				mineSweeper: state.mineSweeper.questionBlock(action.payload.id)
			};
		case GameActions.UNREVEAL:
			return {
				...state,
				mineSweeper: state.mineSweeper.unrevealBlock(action.payload.id)
			};
		default:
			return state;
	}
}
