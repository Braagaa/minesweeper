import {BlockID} from '../../utils/Block';

export enum GameActions {
	CREATE_GAME = "CREATE_GAME",
	REVEAL = "REVEAL",
	UNREVEAL = "UNREVEAL",
	FLAG = "FLAG",
	QUESTION = "QUESTION",
	LOSE_GAME = "LOSE_GAME"
}

type Action<T extends GameActions> = {type: T};
type Payload<T extends Object> = Record<'payload',T>;
type PayloadId<T extends GameActions> = {type: T, payload: {id: BlockID;}};

export type CreateGameAction = Action<GameActions.CREATE_GAME> & Payload<{
	width: number;
	height: number;
	mines: number;
}>;

export type RevealAction = PayloadId<GameActions.REVEAL>;
export type FlagAction = PayloadId<GameActions.FLAG>;
export type QuestionAction = PayloadId<GameActions.QUESTION>;
export type UnrevealAction = PayloadId<GameActions.UNREVEAL>;

export const createGame = (width: number, height: number, mines: number): CreateGameAction => ({
	type: GameActions.CREATE_GAME,
	payload: {width, height, mines}
});

export const revealBlock = (id: BlockID): RevealAction => ({
	type: GameActions.REVEAL,
	payload: {id}
});

export const flagBlock = (id: BlockID): FlagAction => ({
	type: GameActions.FLAG,
	payload: {id}
});

export const questionBlock = (id: BlockID): QuestionAction => ({
	type: GameActions.QUESTION,
	payload: {id}
});

export const unrevealBlock = (id: BlockID): UnrevealAction => ({
	type: GameActions.UNREVEAL,
	payload: {id}
});
