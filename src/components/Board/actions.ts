import {BlockID} from '../../utils/Block';

export enum GameActions {
	CREATE_GAME = "CREATE_GAME",
	REVEAL = "REVEAL",
	LOSE_GAME = "LOSE_GAME"
}

type Action<T extends GameActions> = {type: T};
type Payload<T extends Object> = Record<'payload',T>;

export type CreateGameAction = Action<GameActions.CREATE_GAME> & Payload<{
	width: number;
	height: number;
	mines: number;
}>;

export type RevealAction = Action<GameActions.REVEAL> & Payload<{
	id: BlockID;
}>;

export const createGame = (width: number, height: number, mines: number): CreateGameAction => ({
	type: GameActions.CREATE_GAME,
	payload: {width, height, mines}
});

export const revealBlock = (id: BlockID): RevealAction => ({
	type: GameActions.REVEAL,
	payload: {id}
});
