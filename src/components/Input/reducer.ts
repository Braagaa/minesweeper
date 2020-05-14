import {InputActions, WriteInputAction} from './actions';

type ReducerActions = WriteInputAction;

export interface InputState {
	[key: string]: string;
}

export const initialState: InputState = {};

export default function(state: InputState = initialState, action: ReducerActions): InputState {
	console.log(action.type);
	switch (action.type) {
		case InputActions.CREATE_INPUT:
			return {...state, [action.payload.key]: action.payload.value};
		case InputActions.WRITE_INPUT:
			return {...state, [action.payload.key]: action.payload.value};
		default:
			return state;
	} 
}
