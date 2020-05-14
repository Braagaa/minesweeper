export enum GameActions {
	CREATE_GAME = "CREATE_GAME",
	END_GAME = "END_GAME"
}

export interface CreateGameAction {
	type: GameActions.CREATE_GAME;
	payload: {
		width: number;
		height: number;
		mines: number;
	} 
}

export const createGame = (width: number, height: number, mines: number): CreateGameAction => ({
	type: GameActions.CREATE_GAME,
	payload: {width, height, mines}
});
