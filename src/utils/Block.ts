export type BlockID = [number, number];

export enum Statuses {
	UNREVEALED,
	REVEALED,
	FLAGGED,
	QUESTIONED
}

export enum Types {
	NULL,
	NUMBER,
	MINE
}

export default abstract class Block {
    private _status: Statuses = Statuses.UNREVEALED;

    constructor(public readonly id: BlockID) { }

    public get status(): Statuses {
        return this._status;
    }

    public set status(status: Statuses) {
        if (this._status === Statuses.REVEALED)
            throw new Error('Revealed blocks cannot change their statuses.');
        this._status = status;
    }
}

export class NullBlock extends Block {};
export class MineBlock extends Block {};

export class NumberBlock extends Block {
	constructor(
		public readonly id: BlockID,
		public readonly number: number,
	) {
		super(id);
	}
};
