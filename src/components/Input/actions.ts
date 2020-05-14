export enum InputActions {
	CREATE_INPUT = 'CREATE_INPUT',
	WRITE_INPUT = 'WRITE_INPUT'
}

export interface WriteInputAction {
	type: InputActions.CREATE_INPUT | InputActions.WRITE_INPUT,
	payload: {
		key: string;
		value: string;
	}
}

export const createInput = (key: string, value: string): WriteInputAction => ({
	type: InputActions.CREATE_INPUT,
	payload: {key, value}
});

export const writeInput = (key: string, value: string): WriteInputAction => ({
	type: InputActions.WRITE_INPUT,
	payload: {key, value}
});
