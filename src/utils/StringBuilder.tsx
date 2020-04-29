export default class StringBuilder {
    constructor(readonly value: string) {}

    public firstWord(): StringBuilder {
        return new StringBuilder(this.value.split(' ')[0]);
    }

    public capitalize(): StringBuilder {
		return new StringBuilder(this.value.slice(0, 1).toUpperCase() + 
			this.value.slice(1));
    }

	public toLowerCase(): StringBuilder {
		return new StringBuilder(this.value.toLowerCase());
	}

    public concat(param: string | number): StringBuilder { 
        return new StringBuilder(this.value + param);
    }

    public get getValue(): string { 
        return this.value;
    }
    
}
